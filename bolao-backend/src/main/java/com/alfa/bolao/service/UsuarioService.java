package com.alfa.bolao.service;

import com.alfa.bolao.dto.CadastroRequest;
import com.alfa.bolao.dto.CadastroResponse;
import com.alfa.bolao.model.Usuario;
import com.alfa.bolao.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public CadastroResponse cadastrar(CadastroRequest request) {

        if (usuarioRepository.findByEmail(request.email()).isPresent()) {
            throw new RuntimeException("E-mail já cadastrado");
        }

        Usuario usuario = Usuario.builder()
                .nome(request.nome())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .privilegio("USER")
                .build();

        Usuario salvo = usuarioRepository.save(usuario);

        return new CadastroResponse(
                salvo.getId(),
                salvo.getNome(),
                salvo.getEmail()
        );
    }
}
