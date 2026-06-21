package com.alfa.bolao.service;

import com.alfa.bolao.entity.Palpite;
import com.alfa.bolao.entity.Partida;
import com.alfa.bolao.entity.Usuario;
import com.alfa.bolao.repository.PalpiteRepository;
import com.alfa.bolao.repository.UsuarioRepository;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PontuacaoService {
    private final PalpiteRepository palpiteRepository;
    private final UsuarioRepository usuarioRepository;

    public PontuacaoService(PalpiteRepository palpiteRepository, UsuarioRepository usuarioRepository) {
        this.palpiteRepository = palpiteRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @Transactional
    public void recalcularPartida(Partida partida) {
        List<Palpite> palpites = palpiteRepository.findByPartida(partida);
        Set<Usuario> usuariosAfetados = new HashSet<>();
        for (Palpite palpite : palpites) {
            int pontos = calcularPontos(palpite, partida);
            palpite.setPontos(pontos);
            palpite.setCriterio(criterio(pontos));
            palpiteRepository.save(palpite);
            usuariosAfetados.add(palpite.getUsuario());
        }
        for (Usuario usuario : usuariosAfetados) {
            recalcularUsuario(usuario);
        }
    }

    public void recalcularUsuario(Usuario usuario) {
        List<Palpite> palpites = palpiteRepository.findByUsuario(usuario);
        int total = palpites.stream().mapToInt(Palpite::getPontos).sum();
        int exatos = (int) palpites.stream().filter(palpite -> palpite.getPontos() == 10).count();
        usuario.setPontuacaoTotal(total);
        usuario.setPlacaresExatos(exatos);
        usuarioRepository.save(usuario);
    }

    private int calcularPontos(Palpite palpite, Partida partida) {
        if (partida.getGolsA() == null || partida.getGolsB() == null) {
            return 0;
        }
        boolean exato = palpite.getGolsA().equals(partida.getGolsA()) && palpite.getGolsB().equals(partida.getGolsB());
        if (exato) {
            return 10;
        }
        int sinalPalpite = Integer.compare(palpite.getGolsA(), palpite.getGolsB());
        int sinalResultado = Integer.compare(partida.getGolsA(), partida.getGolsB());
        return sinalPalpite == sinalResultado ? 5 : 0;
    }

    private String criterio(int pontos) {
        if (pontos == 10) {
            return "Placar exato";
        }
        if (pontos == 5) {
            return "Acerto do vencedor ou empate";
        }
        return "Erro total";
    }
}