package com.alfa.bolao.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "partidas")
public class Partida {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "selecao_a_id")
    private Selecao selecaoA;

    @ManyToOne(optional = false)
    @JoinColumn(name = "selecao_b_id")
    private Selecao selecaoB;

    private LocalDateTime dataHora;

    private String estadio;

    private String fase;

    private String grupo;

    @Enumerated(EnumType.STRING)
    private StatusPartida status = StatusPartida.AGENDADA;

    private Integer golsA;

    private Integer golsB;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Selecao getSelecaoA() {
        return selecaoA;
    }

    public void setSelecaoA(Selecao selecaoA) {
        this.selecaoA = selecaoA;
    }

    public Selecao getSelecaoB() {
        return selecaoB;
    }

    public void setSelecaoB(Selecao selecaoB) {
        this.selecaoB = selecaoB;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }

    public String getEstadio() {
        return estadio;
    }

    public void setEstadio(String estadio) {
        this.estadio = estadio;
    }

    public String getFase() {
        return fase;
    }

    public void setFase(String fase) {
        this.fase = fase;
    }

    public String getGrupo() {
        return grupo;
    }

    public void setGrupo(String grupo) {
        this.grupo = grupo;
    }

    public StatusPartida getStatus() {
        return status;
    }

    public void setStatus(StatusPartida status) {
        this.status = status;
    }

    public Integer getGolsA() {
        return golsA;
    }

    public void setGolsA(Integer golsA) {
        this.golsA = golsA;
    }

    public Integer getGolsB() {
        return golsB;
    }

    public void setGolsB(Integer golsB) {
        this.golsB = golsB;
    }
}