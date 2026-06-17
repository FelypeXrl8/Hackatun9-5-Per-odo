package com.alfa.bolao.repository;

import com.alfa.bolao.model.Palpite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PalpiteRepository extends JpaRepository<Palpite, Long> {

    List<Palpite> findByUsuarioId(Long usuarioId);

    Optional<Palpite> findByUsuarioIdAndPartidaId(
            Long usuarioId,
            Long partidaId);

    List<Palpite> findByPartidaId(Long partidaId);

}