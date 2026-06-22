package com.alfa.bolao.dto;

import com.alfa.bolao.entity.Usuario;

public record RankingResponse(
    Integer position,
    Long usuarioId,
    String nome,
    Integer points,
    Integer exactScores
) {
    public static RankingResponse from(Usuario usuario, int position) {
        return new RankingResponse(
            position,
            usuario.getId(),
            usuario.getNome(),
            usuario.getPontuacaoTotal(),
            usuario.getPlacaresExatos()
        );
    }
}
