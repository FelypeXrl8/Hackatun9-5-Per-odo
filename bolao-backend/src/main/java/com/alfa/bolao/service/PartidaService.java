package com.alfa.bolao.service;

import com.alfa.bolao.dto.partida.PartidaResponse;
import com.alfa.bolao.model.Partida;
import com.alfa.bolao.repository.PartidaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PartidaService {

    private final PartidaRepository partidaRepository;

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
        Partida partida = partidaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Partida não encontrada"));

        return new PartidaResponse(partida);
    }
}