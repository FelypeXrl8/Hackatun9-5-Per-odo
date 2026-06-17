package com.alfa.bolao.repository;

import com.alfa.bolao.model.Partida;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PartidaRepository extends JpaRepository<Partida, Long> {

    List<Partida> findByFase(String fase);

    List<Partida> findByStatus(String status);

    List<Partida> findByGrupo(String grupo);

}