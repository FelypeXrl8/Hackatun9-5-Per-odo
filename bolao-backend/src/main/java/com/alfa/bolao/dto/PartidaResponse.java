package com.alfa.bolao.dto;

import com.alfa.bolao.entity.Partida;
import com.alfa.bolao.entity.StatusPartida;

import java.time.LocalDateTime;

public record PartidaResponse(
    Long id,
    SelecaoResponse selecaoA,
    SelecaoResponse selecaoB,
    LocalDateTime dataHora,
    String estadio,
    String fase,
    String grupo,
    String status,
    Integer golsA,
    Integer golsB,
    boolean abertaParaPalpite
) {
    public static PartidaResponse from(Partida partida) {
        boolean abertaParaPalpite =
                partida.getStatus() == StatusPartida.AGENDADA
                        && LocalDateTime.now().isBefore(partida.getDataHora());

        return new PartidaResponse(
                partida.getId(),
                SelecaoResponse.from(partida.getSelecaoA()),
                SelecaoResponse.from(partida.getSelecaoB()),
                partida.getDataHora(),
                partida.getEstadio(),
                partida.getFase(),
                partida.getGrupo(),
                partida.getStatus().name(),
                partida.getGolsA(),
                partida.getGolsB(),
                abertaParaPalpite
        );
    }
}