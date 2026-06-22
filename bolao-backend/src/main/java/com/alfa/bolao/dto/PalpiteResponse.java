package com.alfa.bolao.dto;

import com.alfa.bolao.entity.Palpite;

public record PalpiteResponse(
    Long id,
    PartidaResponse partida,
    Integer golsA,
    Integer golsB,
    Integer pontos,
    String criterio
) {
    public static PalpiteResponse from(Palpite palpite) {
        return new PalpiteResponse(
            palpite.getId(),
            PartidaResponse.from(palpite.getPartida()),
            palpite.getGolsA(),
            palpite.getGolsB(),
            palpite.getPontos(),
            palpite.getCriterio()
        );
    }
}