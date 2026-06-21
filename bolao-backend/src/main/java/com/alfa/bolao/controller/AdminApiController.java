package com.alfa.bolao.controller;

import com.alfa.bolao.dto.BloqueioRequest;
import com.alfa.bolao.dto.PartidaRequest;
import com.alfa.bolao.dto.PartidaResponse;
import com.alfa.bolao.dto.ResultadoRequest;
import com.alfa.bolao.dto.SelecaoRequest;
import com.alfa.bolao.dto.SelecaoResponse;
import com.alfa.bolao.dto.UsuarioResponse;
import com.alfa.bolao.repository.UsuarioRepository;
import com.alfa.bolao.service.PartidaService;
import com.alfa.bolao.service.SelecaoService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminApiController {
    private final SelecaoService selecaoService;
    private final PartidaService partidaService;
    private final UsuarioRepository usuarioRepository;

    public AdminApiController(SelecaoService selecaoService, PartidaService partidaService, UsuarioRepository usuarioRepository) {
        this.selecaoService = selecaoService;
        this.partidaService = partidaService;
        this.usuarioRepository = usuarioRepository;
    }

    @GetMapping("/selecoes")
    public List<SelecaoResponse> listarSelecoes() {
        return selecaoService.listar();
    }

    @PostMapping("/selecoes")
    @ResponseStatus(HttpStatus.CREATED)
    public SelecaoResponse criarSelecao(@RequestBody @Valid SelecaoRequest request) {
        return selecaoService.criar(request);
    }

    @PutMapping("/selecoes/{id}")
    public SelecaoResponse atualizarSelecao(@PathVariable Long id, @RequestBody @Valid SelecaoRequest request) {
        return selecaoService.atualizar(id, request);
    }

    @DeleteMapping("/selecoes/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removerSelecao(@PathVariable Long id) {
        selecaoService.remover(id);
    }

    @PostMapping("/partidas")
    @ResponseStatus(HttpStatus.CREATED)
    public PartidaResponse criarPartida(@RequestBody @Valid PartidaRequest request) {
        return partidaService.criar(request);
    }

    @PutMapping("/partidas/{id}")
    public PartidaResponse atualizarPartida(@PathVariable Long id, @RequestBody @Valid PartidaRequest request) {
        return partidaService.atualizar(id, request);
    }

    @DeleteMapping("/partidas/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removerPartida(@PathVariable Long id) {
        partidaService.remover(id);
    }

    @PostMapping("/partidas/{id}/resultado")
    public PartidaResponse lancarResultado(@PathVariable Long id, @RequestBody @Valid ResultadoRequest request) {
        return partidaService.lancarResultado(id, request);
    }

    @GetMapping("/usuarios")
    public List<UsuarioResponse> listarUsuarios() {
        return usuarioRepository.findAll().stream().map(UsuarioResponse::from).toList();
    }

    @PatchMapping("/usuarios/{id}/bloqueio")
    public UsuarioResponse alterarBloqueio(@PathVariable Long id, @RequestBody BloqueioRequest request) {
        var usuario = usuarioRepository.findById(id).orElseThrow();
        usuario.setBloqueado(request.bloqueado());
        return UsuarioResponse.from(usuarioRepository.save(usuario));
    }
}