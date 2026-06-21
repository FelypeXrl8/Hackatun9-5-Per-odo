package com.alfa.bolao.service;

import com.alfa.bolao.dto.PalpiteRequest;
import com.alfa.bolao.dto.PalpiteResponse;
import com.alfa.bolao.entity.Palpite;
import com.alfa.bolao.entity.Partida;
import com.alfa.bolao.entity.Usuario;
import com.alfa.bolao.exception.BusinessException;
import com.alfa.bolao.repository.PalpiteRepository;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class PalpiteService {
    private final PalpiteRepository palpiteRepository;
    private final PartidaService partidaService;
    private final UsuarioService usuarioService;

    public PalpiteService(PalpiteRepository palpiteRepository, PartidaService partidaService, UsuarioService usuarioService) {
        this.palpiteRepository = palpiteRepository;
        this.partidaService = partidaService;
        this.usuarioService = usuarioService;
    }

    public PalpiteResponse salvar(String email, PalpiteRequest request) {
        Usuario usuario = usuarioService.buscarPorEmail(email);
        Partida partida = partidaService.buscarEntidade(request.partidaId());

        if (!LocalDateTime.now().isBefore(partida.getDataHora())) {
            throw new BusinessException("Não é possível registrar ou editar palpite após o início da partida.");
        }

        Palpite palpite = palpiteRepository.findByUsuarioAndPartida(usuario, partida).orElseGet(Palpite::new);
        palpite.setUsuario(usuario);
        palpite.setPartida(partida);
        palpite.setGolsA(request.golsA());
        palpite.setGolsB(request.golsB());
        palpite.setAtualizadoEm(LocalDateTime.now());

        return PalpiteResponse.from(palpiteRepository.save(palpite));
    }

    public List<PalpiteResponse> meusPalpites(String email) {
        Usuario usuario = usuarioService.buscarPorEmail(email);

        return palpiteRepository.findByUsuarioOrderByCriadoEmDesc(usuario)
            .stream()
            .map(PalpiteResponse::from)
            .toList();
    }
}