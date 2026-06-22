package com.alfa.bolao.controller;

import com.alfa.bolao.dto.*;
import com.alfa.bolao.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/cadastro")
    @ResponseStatus(HttpStatus.CREATED)
    public UsuarioResponse cadastrar(@RequestBody @Valid CadastroRequest request) {
        return authService.cadastrar(request);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody @Valid LoginRequest request) {
        return authService.login(request);

    }

    @PostMapping("/esqueci-senha")
    public String esqueciSenha(
            @RequestBody @Valid EsqueciMinhaSenhaRequest request) {

        return authService.gerarTokenRecuperacao(request);
    }

    @PostMapping("/redefinir-senha")
    public void redefinirSenha(
            @RequestBody @Valid RedefinirSenhaRequest request) {

        authService.redefinirSenha(request);
    }
}