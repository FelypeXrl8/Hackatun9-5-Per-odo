package com.alfa.bolao.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record PalpiteRequest(
    @NotNull Long partidaId,
    @NotNull @Min(0) Integer golsA,
    @NotNull @Min(0) Integer golsB
) {}