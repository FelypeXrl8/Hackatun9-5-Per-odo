package com.alfa.bolao.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record ResultadoRequest(
    @NotNull @Min(0) Integer golsA,
    @NotNull @Min(0) Integer golsB
) {}