package com.alfa.bolao.api;

import com.alfa.bolao.dto.partida.EncerrarPartidaRequest;
import com.alfa.bolao.dto.partida.PartidaResponse;
import com.alfa.bolao.service.PartidaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/partidas")
@RequiredArgsConstructor
public class PartidaApi {

    private final PartidaService partidaService;

    @GetMapping
    public List<PartidaResponse> listar(
            @RequestParam(required = false) String fase,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String group
    ) {
        return partidaService.listar(fase, status, group);
    }

    @GetMapping("/{id}")
    public PartidaResponse detalhar(@PathVariable Long id) {
        return partidaService.detalhar(id);
    }


    @PutMapping("/{id}/encerrar")
    public PartidaResponse encerrar(
            @PathVariable Long id,
            @RequestBody @Valid EncerrarPartidaRequest request
    ) {
        return partidaService.encerrarPartida(id, request.golsMandante(), request.golsVisitante());
    }
}
