package com.alfa.bolao.repository;

import com.alfa.bolao.dto.ranking.RankingResponse;
import com.alfa.bolao.model.Palpite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PalpiteRepository extends JpaRepository<Palpite, Long> {

    List<Palpite> findByUsuarioId(Long usuarioId);

    Optional<Palpite> findByUsuarioIdAndPartidaId(
            Long usuarioId,
            Long partidaId
    );

    List<Palpite> findByPartidaId(Long partidaId);

    boolean existsByUsuarioIdAndPartidaId(Long usuarioId, Long partidaId);

    @Query("""
        SELECT new com.alfa.bolao.dto.ranking.RankingResponse(
            null,
            p.usuario.id,
            p.usuario.nome,
            COALESCE(SUM(p.pontuacao), 0)
        )
        FROM Palpite p
        GROUP BY p.usuario.id, p.usuario.nome, p.usuario.criadoEm
        ORDER BY COALESCE(SUM(p.pontuacao), 0) DESC,
                 SUM(CASE WHEN p.pontuacao = 10 THEN 1 ELSE 0 END) DESC,
                 p.usuario.criadoEm ASC
    """)
    List<RankingResponse> buscarRanking();

}