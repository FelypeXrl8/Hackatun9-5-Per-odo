package com.alfa.bolao.dto;

import com.alfa.bolao.entity.Usuario;
import java.time.LocalDateTime;

public record UsuarioResponse(
    Long id,
    String nome,
    String email,
    String avatarUrl,
    String perfil,
    boolean bloqueado,
    Integer pontuacaoTotal,
    Integer placaresExatos,
    LocalDateTime criadoEm
) {
    public static UsuarioResponse from(Usuario usuario) {
        return new UsuarioResponse(
            usuario.getId(),
            usuario.getNome(),
            usuario.getEmail(),
            usuario.getAvatarUrl(),
            usuario.getPerfil().name(),
            usuario.isBloqueado(),
            usuario.getPontuacaoTotal(),
            usuario.getPlacaresExatos(),
            usuario.getCriadoEm()
        );
    }
}
