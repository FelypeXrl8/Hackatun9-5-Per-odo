package com.alfa.bolao.repository;

import com.alfa.bolao.entity.Usuario;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);
    boolean existsByEmail(String email);
    long countByCriadoEmAfter(LocalDateTime data);
    List<Usuario> findAllByOrderByPontuacaoTotalDescPlacaresExatosDescCriadoEmAsc();
}
