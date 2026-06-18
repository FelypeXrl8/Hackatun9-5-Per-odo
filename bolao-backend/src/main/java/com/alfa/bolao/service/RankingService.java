package com.alfa.bolao.service;

import com.alfa.bolao.dto.ranking.RankingResponse;
import com.alfa.bolao.model.Usuario;
import com.alfa.bolao.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RankingService {

    private final UsuarioRepository usuarioRepository;

    public List<RankingResponse> listarRanking() {

        List<Usuario> usuarios =
                usuarioRepository
                        .findAllByOrderByPontuacaoTotalDescPlacaresExatosDescCriadoEmAsc();

        List<RankingResponse> ranking = new ArrayList<>();

        int posicao = 1;

        for (Usuario usuario : usuarios) {

            ranking.add(
                    new RankingResponse(
                            posicao++,
                            usuario.getNome(),
                            usuario.getPontuacaoTotal(),
                            usuario.getPlacaresExatos()
                    )
            );
        }

        return ranking;
    }
}