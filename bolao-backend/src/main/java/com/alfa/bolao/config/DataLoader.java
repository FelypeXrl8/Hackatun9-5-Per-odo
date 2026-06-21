package com.alfa.bolao.config;

import com.alfa.bolao.entity.Partida;
import com.alfa.bolao.entity.Perfil;
import com.alfa.bolao.entity.Selecao;
import com.alfa.bolao.entity.StatusPartida;
import com.alfa.bolao.entity.Usuario;
import com.alfa.bolao.repository.PartidaRepository;
import com.alfa.bolao.repository.SelecaoRepository;
import com.alfa.bolao.repository.UsuarioRepository;
import java.time.LocalDateTime;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {
    private final UsuarioRepository usuarioRepository;
    private final SelecaoRepository selecaoRepository;
    private final PartidaRepository partidaRepository;
    private final PasswordEncoder passwordEncoder;

    public DataLoader(UsuarioRepository usuarioRepository, SelecaoRepository selecaoRepository, PartidaRepository partidaRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.selecaoRepository = selecaoRepository;
        this.partidaRepository = partidaRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        criarUsuario("Administrador", "admin@bolao.com", "admin123", Perfil.ADMIN);
        criarUsuario("Renan Oliveira", "renan@bolao.com", "123456", Perfil.USER);

        Selecao brasil = criarSelecao("Brasil", "BRA", "https://flagcdn.com/w320/br.png", "A");
        Selecao argentina = criarSelecao("Argentina", "ARG", "https://flagcdn.com/w320/ar.png", "A");
        Selecao franca = criarSelecao("França", "FRA", "https://flagcdn.com/w320/fr.png", "B");
        Selecao alemanha = criarSelecao("Alemanha", "ALE", "https://flagcdn.com/w320/de.png", "B");

        criarPartida(brasil, argentina, LocalDateTime.now().plusDays(3).withHour(16).withMinute(0).withSecond(0).withNano(0), "MetLife Stadium", "Fase de Grupos", "A");
        criarPartida(franca, alemanha, LocalDateTime.now().plusDays(4).withHour(13).withMinute(0).withSecond(0).withNano(0), "Estádio Azteca", "Fase de Grupos", "B");
    }

    private void criarUsuario(String nome, String email, String senha, Perfil perfil) {
        if (usuarioRepository.existsByEmail(email)) {
            return;
        }

        Usuario usuario = new Usuario();
        usuario.setNome(nome);
        usuario.setEmail(email);
        usuario.setSenha(passwordEncoder.encode(senha));
        usuario.setPerfil(perfil);

        usuarioRepository.save(usuario);
    }

    private Selecao criarSelecao(String nome, String codigo, String urlImagem, String grupo) {
        return selecaoRepository.findByCodigoFifa(codigo).orElseGet(() -> {
            Selecao selecao = new Selecao();
            selecao.setNome(nome);
            selecao.setCodigoFifa(codigo);
            selecao.setUrlImagem(urlImagem);
            selecao.setGrupo(grupo);
            return selecaoRepository.save(selecao);
        });
    }

    private void criarPartida(Selecao selecaoA, Selecao selecaoB, LocalDateTime dataHora, String estadio, String fase, String grupo) {
        boolean existe = partidaRepository.findAll().stream()
            .anyMatch(partida ->
                partida.getSelecaoA().getId().equals(selecaoA.getId())
                    && partida.getSelecaoB().getId().equals(selecaoB.getId())
            );

        if (existe) {
            return;
        }

        Partida partida = new Partida();
        partida.setSelecaoA(selecaoA);
        partida.setSelecaoB(selecaoB);
        partida.setDataHora(dataHora);
        partida.setEstadio(estadio);
        partida.setFase(fase);
        partida.setGrupo(grupo);
        partida.setStatus(StatusPartida.AGENDADA);

        partidaRepository.save(partida);
    }
}