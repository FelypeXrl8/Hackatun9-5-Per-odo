package com.alfa.bolao.service;

import com.alfa.bolao.dto.palpite.AtualizarPalpiteRequest;
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
import java.util.List;

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

    public List<PalpiteResponse> listarMeusPalpites() {

        Usuario usuario = usuarioAutenticadoService.obterUsuarioLogado();

        return palpiteRepository
                .findByUsuarioId(usuario.getId())
                .stream()
                .map(PalpiteResponse::new)
                .toList();
    }

    public PalpiteResponse atualizar(Long id, AtualizarPalpiteRequest request) {

        Usuario usuario =
                usuarioAutenticadoService.obterUsuarioLogado();

        Palpite palpite = palpiteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Palpite não encontrado"));

        if (!palpite.getUsuario().getId().equals(usuario.getId())) {
            throw new RuntimeException("Você não pode alterar este palpite");
        }

        if (LocalDateTime.now().isAfter(palpite.getPartida().getDataHora())) {
            throw new RuntimeException("A partida já foi iniciada");
        }

        palpite.setGolsMandante(request.golsMandante());

        palpite.setGolsVisitante(request.golsVisitante());

        Palpite atualizado = palpiteRepository.save(palpite);

        return new PalpiteResponse(atualizado);
    }
}
