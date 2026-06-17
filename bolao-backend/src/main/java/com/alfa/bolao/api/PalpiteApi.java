package com.alfa.bolao.api;

import com.alfa.bolao.dto.palpite.AtualizarPalpiteRequest;
import com.alfa.bolao.dto.palpite.CriarPalpiteRequest;
import com.alfa.bolao.dto.palpite.PalpiteResponse;
import com.alfa.bolao.service.PalpiteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/palpites")
@RequiredArgsConstructor
public class PalpiteApi {

    private final PalpiteService palpiteService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PalpiteResponse criar(@RequestBody @Valid CriarPalpiteRequest request) {
        return palpiteService.criar(request);
    }

    @GetMapping("/meus")
    public List<PalpiteResponse> listarMeusPalpites() {
        return palpiteService.listarMeusPalpites();
    }

    @PutMapping("/{id}")
    public PalpiteResponse atualizar(
            @PathVariable Long id,
            @RequestBody @Valid AtualizarPalpiteRequest request
    ) {
        return palpiteService.atualizar(id, request);
    }
}