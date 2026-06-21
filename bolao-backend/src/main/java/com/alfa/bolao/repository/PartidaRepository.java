package com.alfa.bolao.repository;

import com.alfa.bolao.entity.Partida;
import com.alfa.bolao.entity.StatusPartida;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PartidaRepository extends JpaRepository<Partida, Long> {
    List<Partida> findAllByOrderByDataHoraAsc();
    long countByStatus(StatusPartida status);
}