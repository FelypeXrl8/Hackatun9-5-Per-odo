package com.alfa.bolao.repository;

import com.alfa.bolao.entity.Selecao;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SelecaoRepository extends JpaRepository<Selecao, Long> {
    Optional<Selecao> findByCodigoFifa(String codigoFifa);
    boolean existsByCodigoFifa(String codigoFifa);
    boolean existsByCodigoFifaAndIdNot(String codigoFifa, Long id);
}
