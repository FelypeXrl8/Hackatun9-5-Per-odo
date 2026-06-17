package com.alfa.bolao.controller;

import com.alfa.bolao.dto.CadastroRequest;
import com.alfa.bolao.dto.CadastroResponse;
import com.alfa.bolao.service.UsuarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class LoginController {

    private final UsuarioService usuarioService;

    @PostMapping("/cadastro")
    @ResponseStatus(HttpStatus.CREATED)
    public CadastroResponse cadastrar(@RequestBody @Valid CadastroRequest request) {
        return usuarioService.cadastrar(request);
    }
}
