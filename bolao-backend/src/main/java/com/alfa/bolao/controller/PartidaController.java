package com.alfa.bolao.controller;

import com.alfa.bolao.dto.PartidaResponse;
import com.alfa.bolao.entity.StatusPartida;
import com.alfa.bolao.service.PartidaService;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/partidas")
public class PartidaController {
    private final PartidaService partidaService;

    public PartidaController(PartidaService partidaService) {
        this.partidaService = partidaService;
    }

    @GetMapping
    public List<PartidaResponse> listar(
            @RequestParam(required = false) String fase,
            @RequestParam(required = false) StatusPartida status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime dataInicio,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime dataFim
    ) {
        return partidaService.filtrar(fase, status, dataInicio, dataFim);
    }

    @GetMapping("/{id}")
    public PartidaResponse buscar(@PathVariable Long id) {
        return partidaService.buscar(id);
    }
}