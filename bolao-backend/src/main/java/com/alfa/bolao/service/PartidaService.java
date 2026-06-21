package com.alfa.bolao.service;

import com.alfa.bolao.dto.PartidaRequest;
import com.alfa.bolao.dto.PartidaResponse;
import com.alfa.bolao.dto.ResultadoRequest;
import com.alfa.bolao.entity.Partida;
import com.alfa.bolao.entity.Selecao;
import com.alfa.bolao.entity.StatusPartida;
import com.alfa.bolao.exception.BusinessException;
import com.alfa.bolao.exception.NotFoundException;
import com.alfa.bolao.repository.PartidaRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PartidaService {
    private final PartidaRepository partidaRepository;
    private final SelecaoService selecaoService;
    private final PontuacaoService pontuacaoService;

    public PartidaService(PartidaRepository partidaRepository, SelecaoService selecaoService, PontuacaoService pontuacaoService) {
        this.partidaRepository = partidaRepository;
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

    public PartidaResponse criar(PartidaRequest request) {
        if (request.selecaoAId().equals(request.selecaoBId())) {
            throw new BusinessException("A partida precisa ter duas seleções diferentes.");
        }
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

    public PartidaResponse atualizar(Long id, PartidaRequest request) {
        Partida partida = buscarEntidade(id);
        partida.setSelecaoA(selecaoService.buscarEntidade(request.selecaoAId()));
        partida.setSelecaoB(selecaoService.buscarEntidade(request.selecaoBId()));
        partida.setDataHora(request.dataHora());
        partida.setEstadio(request.estadio());
        partida.setFase(request.fase());
        partida.setGrupo(request.grupo());
        return PartidaResponse.from(partidaRepository.save(partida));
    }

    public void remover(Long id) {
        partidaRepository.delete(buscarEntidade(id));
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
}