package com.alfa.bolao.repository;

import com.alfa.bolao.entity.TokenRecuperacao;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TokenRecuperacaoRepository
        extends JpaRepository<TokenRecuperacao, Long> {

    Optional<TokenRecuperacao> findByToken(String token);

}