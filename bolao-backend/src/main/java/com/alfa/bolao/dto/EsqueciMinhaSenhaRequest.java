package com.alfa.bolao.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record EsqueciMinhaSenhaRequest(

        @Email
        @NotBlank
        String email

) {}