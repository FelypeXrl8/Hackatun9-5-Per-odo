package com.alfa.bolao.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public record PartidaRequest(
    @NotNull Long selecaoAId,
    @NotNull Long selecaoBId,
    @NotNull LocalDateTime dataHora,
    @NotBlank String estadio,
    @NotBlank String fase,
    String grupo
) {}