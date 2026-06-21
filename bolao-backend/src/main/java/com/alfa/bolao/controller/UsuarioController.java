package com.alfa.bolao.controller;

import com.alfa.bolao.dto.AtualizarPerfilRequest;
import com.alfa.bolao.dto.UsuarioResponse;
import com.alfa.bolao.service.UsuarioService;
import jakarta.validation.Valid;
import java.security.Principal;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping("/me")
    public UsuarioResponse me(Principal principal) {
        return UsuarioResponse.from(usuarioService.buscarPorEmail(principal.getName()));
    }

    @PutMapping("/me")
    public UsuarioResponse atualizar(Principal principal, @RequestBody @Valid AtualizarPerfilRequest request) {
        return usuarioService.atualizarPerfil(principal.getName(), request);
    }

    @DeleteMapping("/me")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(Principal principal) {
        usuarioService.excluirConta(principal.getName());
    }
}