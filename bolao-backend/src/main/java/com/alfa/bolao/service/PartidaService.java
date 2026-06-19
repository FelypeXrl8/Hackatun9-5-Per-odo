package com.alfa.bolao.service;

import com.alfa.bolao.dto.partida.PartidaResponse;
import com.alfa.bolao.dto.partida.PartidasPorFaseResponse;
import com.alfa.bolao.dto.partida.ResultadoPartidaRequest;
import com.alfa.bolao.model.Partida;
import com.alfa.bolao.repository.PartidaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.stream.Collectors;
import com.alfa.bolao.dto.partida.PartidaRequest;
import com.alfa.bolao.model.Selecao;
import com.alfa.bolao.repository.SelecaoRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PartidaService {

    private final PartidaRepository partidaRepository;
    private final PalpiteService palpiteService;
    private final SelecaoRepository selecaoRepository;

    public List<PartidaResponse> listar(String fase, String status, String grupo) {
        List<Partida> partidas;

        if (fase != null) {
            partidas = partidaRepository.findByFase(fase);
        } else if (status != null) {
            partidas = partidaRepository.findByStatus(status);
        } else if (grupo != null) {
            partidas = partidaRepository.findByGrupo(grupo);
        } else {
            partidas = partidaRepository.findAll();
        }

        return partidas.stream()
                .map(PartidaResponse::new)
                .toList();
    }

    public PartidaResponse detalhar(Long id) {
        Partida partida = buscarPartidaPorId(id);

        return new PartidaResponse(partida);
    }

    @Transactional
    public PartidaResponse lancarResultado(Long id, ResultadoPartidaRequest request) {
        Partida partida = buscarPartidaPorId(id);

        partida.setGolsMandante(request.golsMandante());
        partida.setGolsVisitante(request.golsVisitante());
        partida.setStatus("FINALIZADA");

        Partida partidaAtualizada = partidaRepository.save(partida);

        palpiteService.recalcularPontuacaoDaPartida(partidaAtualizada);

        return new PartidaResponse(partidaAtualizada);
    }

    public List<PartidaResponse> listarProximasAbertas() {
        return partidaRepository.buscarProximasAbertas()
                .stream()
                .map(PartidaResponse::new)
                .toList();
    }

    public List<PartidasPorFaseResponse> listarAgrupadasPorFase() {
        List<PartidaResponse> partidas = partidaRepository.findAll()
                .stream()
                .map(PartidaResponse::new)
                .toList();

        Map<String, List<PartidaResponse>> partidasAgrupadas = partidas.stream()
                .collect(Collectors.groupingBy(
                        PartidaResponse::fase,
                        LinkedHashMap::new,
                        Collectors.toList()
                ));

        return partidasAgrupadas.entrySet()
                .stream()
                .map(entry -> new PartidasPorFaseResponse(
                        entry.getKey(),
                        entry.getValue()
                ))
                .toList();
    }

    @Transactional
    public PartidaResponse criar(PartidaRequest request) {
        Selecao mandante = buscarSelecaoPorId(request.mandanteId());
        Selecao visitante = buscarSelecaoPorId(request.visitanteId());

        if (mandante.getId().equals(visitante.getId())) {
            throw new RuntimeException("Mandante e visitante não podem ser a mesma seleção");
        }

        Partida partida = Partida.builder()
                .mandante(mandante)
                .visitante(visitante)
                .dataHora(request.dataHora())
                .fase(request.fase())
                .estadio(request.estadio())
                .grupo(request.grupo())
                .status(request.status() != null ? request.status() : "AGENDADA")
                .build();

        Partida partidaSalva = partidaRepository.save(partida);

        return new PartidaResponse(partidaSalva);
    }

    @Transactional
    public PartidaResponse atualizar(Long id, PartidaRequest request) {
        Partida partida = buscarPartidaPorId(id);

        Selecao mandante = buscarSelecaoPorId(request.mandanteId());
        Selecao visitante = buscarSelecaoPorId(request.visitanteId());

        if (mandante.getId().equals(visitante.getId())) {
            throw new RuntimeException("Mandante e visitante não podem ser a mesma seleção");
        }

        partida.setMandante(mandante);
        partida.setVisitante(visitante);
        partida.setDataHora(request.dataHora());
        partida.setFase(request.fase());
        partida.setEstadio(request.estadio());
        partida.setGrupo(request.grupo());
        partida.setStatus(request.status() != null ? request.status() : partida.getStatus());

        Partida partidaAtualizada = partidaRepository.save(partida);

        return new PartidaResponse(partidaAtualizada);
    }

    @Transactional
    public void deletar(Long id) {
        Partida partida = buscarPartidaPorId(id);

        partidaRepository.delete(partida);
    }

    private Partida buscarPartidaPorId(Long id) {
        return partidaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Partida não encontrada"));
    }

    private Selecao buscarSelecaoPorId(Long id) {
        return selecaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Seleção não encontrada"));
    }
}