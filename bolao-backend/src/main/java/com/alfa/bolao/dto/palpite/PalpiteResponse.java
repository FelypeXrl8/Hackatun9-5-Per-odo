package com.alfa.bolao.dto.palpite;

import com.alfa.bolao.model.Palpite;

public record PalpiteResponse(
        Long id,
        Long partidaId,
        String mandante,
        String visitante,
        Integer golsMandante,
        Integer golsVisitante,
        Integer pontuacao
) {

    public PalpiteResponse(Palpite palpite) {
        this(
                palpite.getId(),
                palpite.getPartida().getId(),
                palpite.getPartida().getMandante().getNome(),
                palpite.getPartida().getVisitante().getNome(),
                palpite.getGolsMandante(),
                palpite.getGolsVisitante(),
                palpite.getPontuacao()
        );
    }
}