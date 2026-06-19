package com.alfa.bolao.dto.ranking;

public record RankingResponse(
        Integer posicao,
        Long usuarioId,
        String nome,
        Long pontos
) {}
