package com.alfa.bolao.controller;

import com.alfa.bolao.dto.PartidaResponse;
import com.alfa.bolao.service.PartidaService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/partidas")
public class PartidaController {
    private final PartidaService partidaService;

    public PartidaController(PartidaService partidaService) {
        this.partidaService = partidaService;
    }

    @GetMapping
    public List<PartidaResponse> listar() {
        return partidaService.listar();
    }

    @GetMapping("/{id}")
    public PartidaResponse buscar(@PathVariable Long id) {
        return partidaService.buscar(id);
    }
}