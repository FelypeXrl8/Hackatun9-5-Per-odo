package com.alfa.bolao.service;

import com.alfa.bolao.dto.palpite.CriarPalpiteRequest;
import com.alfa.bolao.dto.palpite.PalpiteResponse;
import com.alfa.bolao.model.Palpite;
import com.alfa.bolao.model.Partida;
import com.alfa.bolao.model.Usuario;
import com.alfa.bolao.repository.PalpiteRepository;
import com.alfa.bolao.repository.PartidaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PalpiteService {

    private final PalpiteRepository palpiteRepository;
    private final PartidaRepository partidaRepository;
    private final UsuarioAutenticadoService usuarioAutenticadoService;

    public PalpiteResponse criar(CriarPalpiteRequest request) {

        Usuario usuario = usuarioAutenticadoService.obterUsuarioLogado();

        Partida partida = partidaRepository.findById(request.partidaId())
                .orElseThrow(() -> new RuntimeException("Partida não encontrada"));

        if (LocalDateTime.now().isAfter(partida.getDataHora())) {
            throw new RuntimeException("Não é possível palpitar em uma partida que já iniciou");
        }

        if (palpiteRepository.existsByUsuarioIdAndPartidaId(usuario.getId(), partida.getId())) {
            throw new RuntimeException("Você já realizou um palpite para esta partida");
        }

        Palpite palpite = Palpite.builder()
                .usuario(usuario)
                .partida(partida)
                .golsMandante(request.golsMandante())
                .golsVisitante(request.golsVisitante())
                .pontuacao(0)
                .build();

        Palpite salvo = palpiteRepository.save(palpite);

        return new PalpiteResponse(salvo);
    }
}
