package com.alfa.bolao.dto;

public record LoginResponse(
    String token,
    UsuarioResponse usuario
) {}