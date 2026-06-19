package com.alfa.bolao.api;

import com.alfa.bolao.dto.auth.CadastroRequest;
import com.alfa.bolao.dto.auth.CadastroResponse;
import com.alfa.bolao.dto.auth.LoginRequest;
import com.alfa.bolao.dto.auth.LoginResponse;
import com.alfa.bolao.model.Usuario;
import com.alfa.bolao.service.TokenService;
import com.alfa.bolao.service.UsuarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthApi {

    private final UsuarioService usuarioService;
    private final TokenService tokenService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/cadastro")
    @ResponseStatus(HttpStatus.CREATED)
    public CadastroResponse cadastrar(@RequestBody @Valid CadastroRequest request) {
        return usuarioService.cadastrar(request);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody @Valid LoginRequest request) {
        Usuario usuario = usuarioService.buscarPorEmail(request.email());

        if (!passwordEncoder.matches(request.password(), usuario.getPassword())) {
            throw new RuntimeException("E-mail ou senha inválidos");
        }

        String token = tokenService.gerarToken(usuario);

        return new LoginResponse(token);
    }
}
