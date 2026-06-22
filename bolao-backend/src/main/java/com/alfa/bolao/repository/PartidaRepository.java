package com.alfa.bolao.repository;

import com.alfa.bolao.entity.Partida;
import com.alfa.bolao.entity.Selecao;
import com.alfa.bolao.entity.StatusPartida;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PartidaRepository extends JpaRepository<Partida, Long> {

    List<Partida> findAllByOrderByDataHoraAsc();

    long countByStatus(StatusPartida status);

    boolean existsBySelecaoAOrSelecaoB(Selecao selecaoA, Selecao selecaoB);

    List<Partida> findByStatusAndDataHoraLessThanEqual(
            StatusPartida status,
            LocalDateTime dataHora
    );

    @Query("""
            SELECT p FROM Partida p
            WHERE (:fase IS NULL OR LOWER(p.fase) = LOWER(:fase))
            AND (:status IS NULL OR p.status = :status)
            AND (:dataInicio IS NULL OR p.dataHora >= :dataInicio)
            AND (:dataFim IS NULL OR p.dataHora <= :dataFim)
            ORDER BY p.dataHora ASC
            """)
    List<Partida> filtrar(
            @Param("fase") String fase,
            @Param("status") StatusPartida status,
            @Param("dataInicio") LocalDateTime dataInicio,
            @Param("dataFim") LocalDateTime dataFim
    );
}