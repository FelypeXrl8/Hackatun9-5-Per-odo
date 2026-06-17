package com.alfa.bolao.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;

@Entity
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


    public Palpite() {
    }


    public Palpite(Long id, Usuario usuario, Partida partida, Integer golsMandante,
                   Integer golsVisitante, Integer pontuacao) {
        this.id = id;
        this.usuario = usuario;
        this.partida = partida;
        this.golsMandante = golsMandante;
        this.golsVisitante = golsVisitante;
        this.pontuacao = pontuacao != null ? pontuacao : 0;
    }

    // ==========================================
    // Getters e Setters Tradicionais
    // ==========================================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Partida getPartida() {
        return partida;
    }

    public void setPartida(Partida partida) {
        this.partida = partida;
    }

    public Integer getGolsMandante() {
        return golsMandante;
    }

    public void setGolsMandante(Integer golsMandante) {
        this.golsMandante = golsMandante;
    }

    public Integer getGolsVisitante() {
        return golsVisitante;
    }

    public void setGolsVisitante(Integer golsVisitante) {
        this.golsVisitante = golsVisitante;
    }

    public Integer getPontuacao() {
        return pontuacao;
    }

    public void setPontuacao(Integer pontuacao) {
        this.pontuacao = pontuacao;
    }
}