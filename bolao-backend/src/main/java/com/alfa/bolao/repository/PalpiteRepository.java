package com.alfa.bolao.repository;

import com.alfa.bolao.entity.Palpite;
import com.alfa.bolao.entity.Partida;
import com.alfa.bolao.entity.Usuario;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PalpiteRepository extends JpaRepository<Palpite, Long> {
    Optional<Palpite> findByUsuarioAndPartida(Usuario usuario, Partida partida);
    List<Palpite> findByUsuarioOrderByCriadoEmDesc(Usuario usuario);
    List<Palpite> findByPartida(Partida partida);
    List<Palpite> findByUsuario(Usuario usuario);
}