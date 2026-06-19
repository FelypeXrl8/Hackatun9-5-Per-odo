package com.alfa.bolao.service;

import com.alfa.bolao.dto.ranking.RankingResponse;
import com.alfa.bolao.model.Usuario;
import com.alfa.bolao.repository.PalpiteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RankingService {

    private final PalpiteRepository palpiteRepository;
    private final UsuarioAutenticadoService usuarioAutenticadoService;

    public List<RankingResponse> obterRanking() {
        List<RankingResponse> rankingSemPosicao = palpiteRepository.buscarRanking();

        List<RankingResponse> rankingComPosicao = new ArrayList<>();

        for (int i = 0; i < rankingSemPosicao.size(); i++) {
            RankingResponse item = rankingSemPosicao.get(i);

            rankingComPosicao.add(new RankingResponse(
                    i + 1,
                    item.usuarioId(),
                    item.nome(),
                    item.pontos()
            ));
        }

        return rankingComPosicao;
    }

    public RankingResponse obterMinhaPosicao() {
        Usuario usuario = usuarioAutenticadoService.obterUsuarioLogado();

        return obterRanking()
                .stream()
                .filter(item -> item.usuarioId().equals(usuario.getId()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado no ranking"));
    }
}