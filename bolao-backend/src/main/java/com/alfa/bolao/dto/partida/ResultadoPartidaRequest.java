package com.alfa.bolao.dto.partida;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record ResultadoPartidaRequest(
        @NotNull @Min(0)
        Integer golsMandante,

        @NotNull @Min(0)
        Integer golsVisitante
) {}