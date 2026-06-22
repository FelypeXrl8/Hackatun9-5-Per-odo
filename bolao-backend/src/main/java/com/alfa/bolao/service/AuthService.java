package com.alfa.bolao.service;

import com.alfa.bolao.dto.*;
import com.alfa.bolao.entity.Perfil;
import com.alfa.bolao.entity.TokenRecuperacao;
import com.alfa.bolao.entity.Usuario;
import com.alfa.bolao.exception.BusinessException;
import com.alfa.bolao.exception.NotFoundException;
import com.alfa.bolao.repository.UsuarioRepository;
import com.alfa.bolao.repository.TokenRecuperacaoRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class AuthService {
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final TokenRecuperacaoRepository tokenRecuperacaoRepository;

    public AuthService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder, JwtService jwtService, TokenRecuperacaoRepository tokenRecuperacaoRepository) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.tokenRecuperacaoRepository = tokenRecuperacaoRepository;
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

    public String gerarTokenRecuperacao(EsqueciMinhaSenhaRequest request) {

        Usuario usuario = usuarioRepository.findByEmail(request.email().toLowerCase())
                .orElseThrow(() -> new NotFoundException("Usuário não encontrado"));

        TokenRecuperacao token = new TokenRecuperacao();
        token.setUsuario(usuario);


        String codigoAleatorio = String.valueOf(new java.util.Random().nextInt(9000) + 1000);
        token.setToken(codigoAleatorio);


        token.setExpiraEm(LocalDateTime.now().plusMinutes(2));


        tokenRecuperacaoRepository.save(token);

        return token.getToken();
    }


    public void redefinirSenha(
            RedefinirSenhaRequest request) {

        TokenRecuperacao token =
                tokenRecuperacaoRepository
                        .findByToken(request.token())
                        .orElseThrow(() ->
                                new NotFoundException(
                                        "Token inválido"));

        if (token.getExpiraEm()
                .isBefore(LocalDateTime.now())) {

            throw new BusinessException(
                    "Token expirado");
        }

        Usuario usuario =
                token.getUsuario();

        usuario.setSenha(
                passwordEncoder.encode(
                        request.novaSenha()));

        usuarioRepository.save(usuario);

        tokenRecuperacaoRepository.delete(token);
    }
}