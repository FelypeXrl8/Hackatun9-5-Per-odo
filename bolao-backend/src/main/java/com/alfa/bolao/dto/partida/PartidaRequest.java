package com.alfa.bolao.dto.partida;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record PartidaRequest(

        @NotNull
        Long mandanteId,

        @NotNull
        Long visitanteId,

        @NotNull
        LocalDateTime dataHora,

        @NotBlank
        String fase,

        @NotBlank
        String estadio,

        String grupo,

        String status
) {
}