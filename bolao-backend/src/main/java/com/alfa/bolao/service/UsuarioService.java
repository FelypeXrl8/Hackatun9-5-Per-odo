package com.alfa.bolao.service;

import com.alfa.bolao.dto.AtualizarPerfilRequest;
import com.alfa.bolao.dto.RankingResponse;
import com.alfa.bolao.dto.UsuarioResponse;
import com.alfa.bolao.entity.Usuario;
import com.alfa.bolao.exception.NotFoundException;
import com.alfa.bolao.repository.PalpiteRepository;
import com.alfa.bolao.repository.UsuarioRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UsuarioService {
    private static final int LIMITE_RANKING = 50;

    private final UsuarioRepository usuarioRepository;
    private final PalpiteRepository palpiteRepository;

    public UsuarioService(UsuarioRepository usuarioRepository, PalpiteRepository palpiteRepository) {
        this.usuarioRepository = usuarioRepository;
        this.palpiteRepository = palpiteRepository;
    }

    public Usuario buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("Usuário não encontrado."));
    }

    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id).orElseThrow(() -> new NotFoundException("Usuário não encontrado."));
    }

    @Transactional
    public UsuarioResponse atualizarPerfil(String email, AtualizarPerfilRequest request) {
        Usuario usuario = buscarPorEmail(email);
        usuario.setNome(request.nome());
        usuario.setAvatarUrl(request.avatarUrl());
        return UsuarioResponse.from(usuarioRepository.save(usuario));
    }

    @Transactional
    public void excluirConta(String email) {
        Usuario usuario = buscarPorEmail(email);
        palpiteRepository.deleteAll(palpiteRepository.findByUsuario(usuario));
        usuarioRepository.delete(usuario);
    }

    @Transactional
    public UsuarioResponse alterarBloqueio(Long id, boolean bloqueado) {
        Usuario usuario = buscarPorId(id);
        usuario.setBloqueado(bloqueado);
        return UsuarioResponse.from(usuarioRepository.save(usuario));
    }


    public List<UsuarioResponse> listarUsuarios() {
        return usuarioRepository.findAllByOrderByPontuacaoTotalDescPlacaresExatosDescCriadoEmAsc()
            .stream()
            .map(UsuarioResponse::from)
            .toList();
    }

    public List<RankingResponse> ranking() {
        return montarRanking(usuarioRepository.findAllByOrderByPontuacaoTotalDescPlacaresExatosDescCriadoEmAsc(), LIMITE_RANKING);
    }

    public RankingResponse rankingDoUsuario(String email) {
        Usuario usuarioLogado = buscarPorEmail(email);
        List<Usuario> usuarios = usuarioRepository.findAllByOrderByPontuacaoTotalDescPlacaresExatosDescCriadoEmAsc();
        for (int i = 0; i < usuarios.size(); i++) {
            Usuario usuario = usuarios.get(i);
            if (usuario.getId().equals(usuarioLogado.getId())) {
                return RankingResponse.from(usuario, i + 1);
            }
        }
        throw new NotFoundException("Usuário não encontrado no ranking.");
    }

    private List<RankingResponse> montarRanking(List<Usuario> usuarios, int limite) {
        List<RankingResponse> ranking = new ArrayList<>();
        int tamanho = Math.min(usuarios.size(), limite);

        for (int i = 0; i < tamanho; i++) {
            ranking.add(RankingResponse.from(usuarios.get(i), i + 1));
        }

        return ranking;
    }
}
