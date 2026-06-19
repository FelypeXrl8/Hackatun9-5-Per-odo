package com.alfa.bolao.repository;

import com.alfa.bolao.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository
        extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByEmail(String email);

    List<Usuario> findAllByOrderByPontuacaoTotalDescPlacaresExatosDescCriadoEmAsc();
}