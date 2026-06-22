package com.alfa.bolao.service;

import com.alfa.bolao.entity.Usuario;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtService {
    @Value("${api.security.token.secret}")
    private String secret;

    public String gerarToken(Usuario usuario) {
        long exp = Instant.now().plus(7, ChronoUnit.DAYS).getEpochSecond();
        String header = base64Url("{\"alg\":\"HS256\",\"typ\":\"JWT\"}");
        String payload = base64Url("{\"sub\":\"" + escape(usuario.getEmail()) + "\",\"role\":\"" + usuario.getPerfil().name() + "\",\"exp\":" + exp + "}");
        String unsigned = header + "." + payload;
        return unsigned + "." + assinar(unsigned);
    }

    public String validarToken(String token) {
        try {
            String[] partes = token.split("\\.");
            if (partes.length != 3) {
                return null;
            }
            String unsigned = partes[0] + "." + partes[1];
            if (!assinar(unsigned).equals(partes[2])) {
                return null;
            }
            String payload = new String(Base64.getUrlDecoder().decode(partes[1]), StandardCharsets.UTF_8);
            long exp = extrairExp(payload);
            if (Instant.now().getEpochSecond() > exp) {
                return null;
            }
            return extrairSub(payload);
        } catch (Exception exception) {
            return null;
        }
    }

    private String assinar(String value) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
            return Base64.getUrlEncoder().withoutPadding().encodeToString(mac.doFinal(value.getBytes(StandardCharsets.UTF_8)));
        } catch (Exception exception) {
            throw new IllegalStateException("Não foi possível gerar token");
        }
    }

    private String base64Url(String value) {
        return Base64.getUrlEncoder().withoutPadding().encodeToString(value.getBytes(StandardCharsets.UTF_8));
    }

    private String extrairSub(String payload) {
        return extrairString(payload, "sub");
    }

    private long extrairExp(String payload) {
        String marker = "\"exp\":";
        int start = payload.indexOf(marker) + marker.length();
        int end = payload.indexOf("}", start);
        return Long.parseLong(payload.substring(start, end));
    }

    private String extrairString(String payload, String field) {
        String marker = "\"" + field + "\":\"";
        int start = payload.indexOf(marker) + marker.length();
        int end = payload.indexOf("\"", start);
        return payload.substring(start, end);
    }

    private String escape(String value) {
        return value.replace("\\", "\\\\").replace("\"", "\\\"");
    }
}