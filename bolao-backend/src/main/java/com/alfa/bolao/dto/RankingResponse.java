package com.alfa.bolao.dto;

public record RankingResponse(
    Integer position,
    Long usuarioId,
    String nome,
    Integer points,
    Integer exactScores
) {}