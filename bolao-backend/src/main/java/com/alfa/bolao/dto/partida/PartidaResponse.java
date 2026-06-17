package com.alfa.bolao.dto.partida;

import com.alfa.bolao.model.Partida;

import java.time.LocalDateTime;

public record PartidaResponse(
        Long id,
        String mandante,
        String visitante,
        LocalDateTime dataHora,
        String fase,
        String estadio,
        String grupo,
        String status,
        Integer golsMandante,
        Integer golsVisitante
) {
    public PartidaResponse(Partida partida) {
        this(
                partida.getId(),
                partida.getMandante().getNome(),
                partida.getVisitante().getNome(),
                partida.getDataHora(),
                partida.getFase(),
                partida.getEstadio(),
                partida.getGrupo(),
                partida.getStatus(),
                partida.getGolsMandante(),
                partida.getGolsVisitante()
        );
    }
}