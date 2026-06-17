package com.alfa.bolao.dto.palpite;

import jakarta.validation.constraints.NotNull;

public record CriarPalpiteRequest(

        @NotNull
        Long partidaId,

        @NotNull
        Integer golsMandante,

        @NotNull
        Integer golsVisitante
) {
}