package com.alfa.bolao.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Partida {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "mandante_id")
    private Selecao mandante;

    @ManyToOne
    @JoinColumn(name = "visitante_id")
    private Selecao visitante;

    private LocalDateTime dataHora;
    private String fase;
    private String estadio;


    private String grupo;
    private String status = "AGENDADA";

    private Integer golsMandante;
    private Integer golsVisitante;

}