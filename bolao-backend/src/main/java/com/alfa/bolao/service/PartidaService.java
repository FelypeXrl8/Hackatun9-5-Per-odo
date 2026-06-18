package com.alfa.bolao.service;

import com.alfa.bolao.dto.partida.PartidaResponse;
import com.alfa.bolao.model.Partida;
import com.alfa.bolao.model.Palpite;
import com.alfa.bolao.model.Usuario;
import com.alfa.bolao.repository.PartidaRepository;
import com.alfa.bolao.repository.PalpiteRepository;
import com.alfa.bolao.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PartidaService {

    private final PartidaRepository partidaRepository;
    private final PalpiteRepository palpiteRepository;
    private final UsuarioRepository usuarioRepository;

    public List<PartidaResponse> listar(String fase, String status, String grupo) {
        List<Partida> partidas;
        if (fase != null) {
            partidas = partidaRepository.findByFase(fase);
        } else if (status != null) {
            partidas = partidaRepository.findByStatus(status);
        } else if (grupo != null) {
            partidas = partidaRepository.findByGrupo(grupo);
        } else {
            partidas = partidaRepository.findAll();
        }
        return partidas.stream().map(PartidaResponse::new).toList();
    }

    public PartidaResponse detalhar(Long id) {
        Partida partida = partidaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Partida não encontrada"));
        return new PartidaResponse(partida);
    }

    // 🔥 MOTOR DE CÁLCULO AUTOMÁTICO (RF-030 E REGRA 4.1 DO PDF)
    @Transactional
    public PartidaResponse encerrarPartida(Long id, Integer golsMandanteReal, Integer golsVisitanteReal) {
        Partida partida = partidaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Partida não encontrada"));

        partida.setGolsMandante(golsMandanteReal);
        partida.setGolsVisitante(golsVisitanteReal);
        partida.setStatus("ENCERRADA");
        partidaRepository.save(partida);

        List<Palpite> palpites = palpiteRepository.findByPartidaId(id);

        for (Palpite palpite : palpites) {
            int pontosGanhos = 0;
            boolean acertouPlacarExato = false;

            int palpiteM = palpite.getGolsMandante();
            int palpiteV = palpite.getGolsVisitante();

            // Regra 4.1 (a): Placar exato = 10 pontos
            if (palpiteM == golsMandanteReal && palpiteV == golsVisitanteReal) {
                pontosGanhos = 10;
                acertouPlacarExato = true;
            }
            // Regra 4.1 (b): Acertou apenas vencedor ou empate = 5 pontos
            else if (Integer.compare(palpiteM, palpiteV) == Integer.compare(golsMandanteReal, golsVisitanteReal)) {
                pontosGanhos = 5;
            }

            palpite.setPontuacao(pontosGanhos);
            palpiteRepository.save(palpite);

            Usuario usuario = palpite.getUsuario();
            usuario.setPontuacaoTotal(usuario.getPontuacaoTotal() + pontosGanhos);

            if (acertouPlacarExato) {
                usuario.setPlacaresExatos(usuario.getPlacaresExatos() + 1);
            }

            usuarioRepository.save(usuario);
        }

        return new PartidaResponse(partida);
    }
}
