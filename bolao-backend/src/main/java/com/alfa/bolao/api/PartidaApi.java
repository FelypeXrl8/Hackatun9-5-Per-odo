package com.alfa.bolao.api;

import com.alfa.bolao.dto.partida.EncerrarPartidaRequest;
import com.alfa.bolao.dto.partida.PartidaRequest;
import com.alfa.bolao.dto.partida.PartidaResponse;
import com.alfa.bolao.dto.partida.PartidasPorFaseResponse;
import com.alfa.bolao.dto.partida.ResultadoPartidaRequest;
import com.alfa.bolao.service.PartidaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
            @RequestParam(required = false) String grupo
    ) {
        return partidaService.listar(fase, status, grupo);
    }

    @GetMapping("/agrupadas-por-fase")
    public ResponseEntity<List<PartidasPorFaseResponse>> listarAgrupadasPorFase() {
        return ResponseEntity.ok(partidaService.listarAgrupadasPorFase());
    }

    @GetMapping("/proximas")
    public List<PartidaResponse> listarProximasAbertas() {
        return partidaService.listarProximasAbertas();
    }

    @GetMapping("/{id}")
    public PartidaResponse detalhar(@PathVariable Long id) {
        return partidaService.detalhar(id);
    }

    @PostMapping
    @PreAuthorize("principal.claims['role'] == 'ADMIN'")
    public ResponseEntity<PartidaResponse> criar(
            @RequestBody @Valid PartidaRequest request
    ) {
        return ResponseEntity.ok(partidaService.criar(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("principal.claims['role'] == 'ADMIN'")
    public ResponseEntity<PartidaResponse> atualizar(
            @PathVariable Long id,
            @RequestBody @Valid PartidaRequest request
    ) {
        return ResponseEntity.ok(partidaService.atualizar(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("principal.claims['role'] == 'ADMIN'")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        partidaService.deletar(id);

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/resultado")
    @PreAuthorize("principal.claims['role'] == 'ADMIN'")
    public PartidaResponse lancarResultado(
            @PathVariable Long id,
            @RequestBody @Valid ResultadoPartidaRequest request
    ) {
        return partidaService.lancarResultado(id, request);
    }
}