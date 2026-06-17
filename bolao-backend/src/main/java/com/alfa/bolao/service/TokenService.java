package com.alfa.bolao.service;

import com.alfa.bolao.model.Usuario;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class TokenService {

    private final JwtEncoder jwtEncoder;

    public String gerarToken(Usuario usuario) {

        Instant agora = Instant.now();

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("bolao-backend")
                .subject(usuario.getEmail())
                .issuedAt(agora)
                .expiresAt(agora.plusSeconds(7200))
                .claim("id", usuario.getId())
                .claim("role", usuario.getPrivilegio())
                .build();

        JwsHeader header = JwsHeader.with(MacAlgorithm.HS256).build();

        return jwtEncoder.encode(
                JwtEncoderParameters.from(header, claims)
        ).getTokenValue();
    }
}