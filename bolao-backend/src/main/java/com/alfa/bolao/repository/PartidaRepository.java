package com.alfa.bolao.repository;

import com.alfa.bolao.model.Partida;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PartidaRepository extends JpaRepository<Partida, Long> {

    List<Partida> findByFase(String fase);

    List<Partida> findByStatus(String status);

    List<Partida> findByGrupo(String grupo);

    @Query("""
        SELECT p FROM Partida p
        WHERE p.dataHora > CURRENT_TIMESTAMP
        AND p.status <> 'FINALIZADA'
        ORDER BY p.dataHora ASC
    """)
    List<Partida> buscarProximasAbertas();

}