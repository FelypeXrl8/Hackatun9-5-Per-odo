package com.alfa.bolao.dto.palpite;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record CriarPalpiteRequest(

        @NotNull
        Long partidaId,

        @NotNull
        @Min(0)
        Integer golsMandante,

        @NotNull
        @Min(0)
        Integer golsVisitante
) {
}