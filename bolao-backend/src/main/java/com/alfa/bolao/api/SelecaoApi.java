package com.alfa.bolao.api;

import com.alfa.bolao.dto.selecao.SelecaoRequest;
import com.alfa.bolao.dto.selecao.SelecaoResponse;
import com.alfa.bolao.service.SelecaoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/selecoes")
@RequiredArgsConstructor
public class SelecaoApi {

    private final SelecaoService selecaoService;

    @GetMapping
    public ResponseEntity<List<SelecaoResponse>> listar() {
        return ResponseEntity.ok(selecaoService.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SelecaoResponse> detalhar(@PathVariable Long id) {
        return ResponseEntity.ok(selecaoService.detalhar(id));
    }

    @PostMapping
    @PreAuthorize("principal.claims['role'] == 'ADMIN'")
    public ResponseEntity<SelecaoResponse> criar(
            @RequestBody @Valid SelecaoRequest request
    ) {
        return ResponseEntity.ok(selecaoService.criar(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("principal.claims['role'] == 'ADMIN'")
    public ResponseEntity<SelecaoResponse> atualizar(
            @PathVariable Long id,
            @RequestBody @Valid SelecaoRequest request
    ) {
        return ResponseEntity.ok(selecaoService.atualizar(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("principal.claims['role'] == 'ADMIN'")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        selecaoService.deletar(id);

        return ResponseEntity.noContent().build();
    }
}