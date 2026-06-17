package com.alfa.bolao.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;

@Entity
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String email;
    private String password;
    private String privilegio; // "ADMIN" ou "USER"

    // Ajuste crítico: inicializando para evitar NullPointerException amanhã
    private Integer pontuacaoTotal = 0;
    private Integer placaresExatos = 0;
    private Boolean bloqueado = false;

    private String avatar;
    private LocalDateTime criadoEm = LocalDateTime.now(); // Já nasce com a data atual do cadastro

    public Usuario() {
    }


    public Usuario(Long id, String nome, String email, String password, String privilegio,
                   Integer pontuacaoTotal, Integer placaresExatos, Boolean bloqueado,
                   String avatar, LocalDateTime criadoEm) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.password = password;
        this.privilegio = privilegio;
        this.pontuacaoTotal = pontuacaoTotal != null ? pontuacaoTotal : 0;
        this.placaresExatos = placaresExatos != null ? placaresExatos : 0;
        this.bloqueado = bloqueado != null ? bloqueado : false;
        this.avatar = avatar;
        this.criadoEm = criadoEm != null ? criadoEm : LocalDateTime.now();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(
                new SimpleGrantedAuthority(
                        "ADMIN".equalsIgnoreCase(this.privilegio) ? "ROLE_ADMIN" : "ROLE_USER"
                )
        );
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return !Boolean.TRUE.equals(this.bloqueado);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPrivilegio() {
        return privilegio;
    }

    public void setPrivilegio(String privilegio) {
        this.privilegio = privilegio;
    }

    public Integer getPontuacaoTotal() {
        return pontuacaoTotal;
    }

    public void setPontuacaoTotal(Integer pontuacaoTotal) {
        this.pontuacaoTotal = pontuacaoTotal;
    }

    public Integer getPlacaresExatos() {
        return placaresExatos;
    }

    public void setPlacaresExatos(Integer placaresExatos) {
        this.placaresExatos = placaresExatos;
    }

    public Boolean getBloqueado() {
        return bloqueado;
    }

    public void setBloqueado(Boolean bloqueado) {
        this.bloqueado = bloqueado;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public LocalDateTime getCriadoEm() {
        return criadoEm;
    }

    public void setCriadoEm(LocalDateTime criadoEm) {
        this.criadoEm = criadoEm;
    }
}