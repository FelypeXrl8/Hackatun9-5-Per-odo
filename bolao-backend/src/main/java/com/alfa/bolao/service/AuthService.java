package com.alfa.bolao.service;

import com.alfa.bolao.dto.CadastroRequest;
import com.alfa.bolao.dto.LoginRequest;
import com.alfa.bolao.dto.LoginResponse;
import com.alfa.bolao.dto.UsuarioResponse;
import com.alfa.bolao.entity.Perfil;
import com.alfa.bolao.entity.Usuario;
import com.alfa.bolao.exception.BusinessException;
import com.alfa.bolao.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public UsuarioResponse cadastrar(CadastroRequest request) {
        if (usuarioRepository.existsByEmail(request.email())) {
            throw new BusinessException("Este e-mail já está cadastrado.");
        }
        Usuario usuario = new Usuario();
        usuario.setNome(request.nome());
        usuario.setEmail(request.email().toLowerCase());
        usuario.setSenha(passwordEncoder.encode(request.password()));
        usuario.setPerfil(Perfil.USER);
        return UsuarioResponse.from(usuarioRepository.save(usuario));
    }

    public LoginResponse login(LoginRequest request) {
        Usuario usuario = usuarioRepository.findByEmail(request.email().toLowerCase())
            .orElseThrow(() -> new BusinessException("E-mail ou senha inválidos."));
        if (usuario.isBloqueado()) {
            throw new BusinessException("Usuário bloqueado pelo administrador.");
        }
        if (!passwordEncoder.matches(request.password(), usuario.getSenha())) {
            throw new BusinessException("E-mail ou senha inválidos.");
        }
        return new LoginResponse(jwtService.gerarToken(usuario), UsuarioResponse.from(usuario));
    }
}