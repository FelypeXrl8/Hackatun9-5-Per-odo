package com.alfa.bolao.service;

import com.alfa.bolao.dto.AtualizarPerfilRequest;
import com.alfa.bolao.dto.RankingResponse;
import com.alfa.bolao.dto.UsuarioResponse;
import com.alfa.bolao.entity.Usuario;
import com.alfa.bolao.exception.NotFoundException;
import com.alfa.bolao.repository.PalpiteRepository;
import com.alfa.bolao.repository.UsuarioRepository;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;
    private final PalpiteRepository palpiteRepository;

    public UsuarioService(UsuarioRepository usuarioRepository, PalpiteRepository palpiteRepository) {
        this.usuarioRepository = usuarioRepository;
        this.palpiteRepository = palpiteRepository;
    }

    public Usuario buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("Usuário não encontrado."));
    }

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

    public List<RankingResponse> ranking() {
        List<Usuario> usuarios = new ArrayList<>(usuarioRepository.findAll());
        usuarios.sort(Comparator
            .comparing(Usuario::getPontuacaoTotal).reversed()
            .thenComparing(Comparator.comparing(Usuario::getPlacaresExatos).reversed())
            .thenComparing(Usuario::getCriadoEm));
        List<RankingResponse> ranking = new ArrayList<>();
        for (int i = 0; i < usuarios.size(); i++) {
            Usuario usuario = usuarios.get(i);
            ranking.add(new RankingResponse(i + 1, usuario.getId(), usuario.getNome(), usuario.getPontuacaoTotal(), usuario.getPlacaresExatos()));
        }
        return ranking;
    }
}