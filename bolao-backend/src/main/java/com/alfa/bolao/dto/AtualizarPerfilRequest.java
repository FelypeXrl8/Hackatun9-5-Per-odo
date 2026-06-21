package com.alfa.bolao.dto;

import jakarta.validation.constraints.NotBlank;

public record AtualizarPerfilRequest(
    @NotBlank String nome,
    String avatarUrl
) {}