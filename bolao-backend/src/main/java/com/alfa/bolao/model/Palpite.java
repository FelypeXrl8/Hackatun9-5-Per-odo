package com.alfa.bolao.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Palpite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relacionamento com o Usuário que fez a aposta
    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    // Relacionamento com a Partida apostada
    @ManyToOne
    @JoinColumn(name = "partida_id")
    private Partida partida;

    private Integer golsMandante;
    private Integer golsVisitante;

    // Inicializado com 0 para evitar null na hora de somar no ranking geral
    private Integer pontuacao = 0;

}