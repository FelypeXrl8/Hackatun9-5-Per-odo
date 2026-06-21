package com.alfa.bolao.controller;

import com.alfa.bolao.dto.RankingResponse;
import com.alfa.bolao.service.UsuarioService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ranking")
public class RankingController {
    private final UsuarioService usuarioService;

    public RankingController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public List<RankingResponse> ranking() {
        return usuarioService.ranking();
    }
}