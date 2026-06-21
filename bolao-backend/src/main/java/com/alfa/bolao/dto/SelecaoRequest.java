package com.alfa.bolao.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record SelecaoRequest(
    @NotBlank String nome,
    @NotBlank @Size(min = 3, max = 3) String codigoFifa,
    String urlImagem,
    String grupo
) {}