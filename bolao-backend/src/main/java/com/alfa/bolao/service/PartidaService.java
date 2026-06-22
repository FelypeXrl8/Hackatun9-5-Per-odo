package com.alfa.bolao.service;

import com.alfa.bolao.dto.PartidaRequest;
import com.alfa.bolao.dto.PartidaResponse;
import com.alfa.bolao.dto.ResultadoRequest;
import com.alfa.bolao.entity.Partida;
import com.alfa.bolao.entity.Selecao;
import com.alfa.bolao.entity.StatusPartida;
import com.alfa.bolao.entity.Usuario;
import com.alfa.bolao.exception.BusinessException;
import com.alfa.bolao.exception.NotFoundException;
import com.alfa.bolao.repository.PalpiteRepository;
import com.alfa.bolao.repository.PartidaRepository;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PartidaService {
    private final PartidaRepository partidaRepository;
    private final PalpiteRepository palpiteRepository;
    private final SelecaoService selecaoService;
    private final PontuacaoService pontuacaoService;

    public PartidaService(PartidaRepository partidaRepository, PalpiteRepository palpiteRepository, SelecaoService selecaoService, PontuacaoService pontuacaoService) {
        this.partidaRepository = partidaRepository;
        this.palpiteRepository = palpiteRepository;
        this.selecaoService = selecaoService;
        this.pontuacaoService = pontuacaoService;
    }

    public List<PartidaResponse> listar() {
        return partidaRepository.findAllByOrderByDataHoraAsc().stream().map(PartidaResponse::from).toList();
    }

    public Partida buscarEntidade(Long id) {
        return partidaRepository.findById(id).orElseThrow(() -> new NotFoundException("Partida não encontrada."));
    }

    public PartidaResponse buscar(Long id) {
        return PartidaResponse.from(buscarEntidade(id));
    }

    @Transactional
    public PartidaResponse criar(PartidaRequest request) {
        validarSelecoes(request.selecaoAId(), request.selecaoBId());
        Selecao selecaoA = selecaoService.buscarEntidade(request.selecaoAId());
        Selecao selecaoB = selecaoService.buscarEntidade(request.selecaoBId());
        Partida partida = new Partida();
        partida.setSelecaoA(selecaoA);
        partida.setSelecaoB(selecaoB);
        partida.setDataHora(request.dataHora());
        partida.setEstadio(request.estadio());
        partida.setFase(request.fase());
        partida.setGrupo(request.grupo());
        partida.setStatus(StatusPartida.AGENDADA);
        return PartidaResponse.from(partidaRepository.save(partida));
    }

    @Transactional
    public PartidaResponse atualizar(Long id, PartidaRequest request) {
        validarSelecoes(request.selecaoAId(), request.selecaoBId());
        Partida partida = buscarEntidade(id);
        partida.setSelecaoA(selecaoService.buscarEntidade(request.selecaoAId()));
        partida.setSelecaoB(selecaoService.buscarEntidade(request.selecaoBId()));
        partida.setDataHora(request.dataHora());
        partida.setEstadio(request.estadio());
        partida.setFase(request.fase());
        partida.setGrupo(request.grupo());
        Partida salva = partidaRepository.save(partida);

        if (salva.getGolsA() != null && salva.getGolsB() != null) {
            pontuacaoService.recalcularPartida(salva);
        }

        return PartidaResponse.from(salva);
    }

    @Transactional
    public void remover(Long id) {
        Partida partida = buscarEntidade(id);
        Set<Usuario> usuariosAfetados = new HashSet<>();
        palpiteRepository.findByPartida(partida).forEach(palpite -> usuariosAfetados.add(palpite.getUsuario()));
        palpiteRepository.deleteByPartida(partida);
        partidaRepository.delete(partida);
        pontuacaoService.recalcularUsuarios(usuariosAfetados);
    }

    @Transactional
    public PartidaResponse lancarResultado(Long id, ResultadoRequest request) {
        Partida partida = buscarEntidade(id);
        partida.setGolsA(request.golsA());
        partida.setGolsB(request.golsB());
        partida.setStatus(StatusPartida.ENCERRADA);
        Partida salva = partidaRepository.save(partida);
        pontuacaoService.recalcularPartida(salva);
        return PartidaResponse.from(salva);
    }

    @Transactional
    public PartidaResponse limparResultado(Long id) {
        Partida partida = buscarEntidade(id);
        partida.setGolsA(null);
        partida.setGolsB(null);
        partida.setStatus(StatusPartida.AGENDADA);
        Partida salva = partidaRepository.save(partida);
        pontuacaoService.recalcularPartida(salva);
        return PartidaResponse.from(salva);
    }

    private void validarSelecoes(Long selecaoAId, Long selecaoBId) {
        if (selecaoAId == null || selecaoBId == null) {
            throw new BusinessException("Informe as duas seleções da partida.");
        }

        if (selecaoAId.equals(selecaoBId)) {
            throw new BusinessException("A partida precisa ter duas seleções diferentes.");
        }
    }

    public List<PartidaResponse> filtrar(
            String fase,
            StatusPartida status,
            LocalDateTime dataInicio,
            LocalDateTime dataFim
    ) {
        return partidaRepository.filtrar(fase, status, dataInicio, dataFim)
                .stream()
                .map(PartidaResponse::from)
                .toList();
    }
}
