package com.alfa.bolao.dto.selecao;

import jakarta.validation.constraints.NotBlank;

public record SelecaoRequest(

        @NotBlank
        String nome,

        @NotBlank
        String codigoFifa,

        String bandeira,

        String grupo
) {
}