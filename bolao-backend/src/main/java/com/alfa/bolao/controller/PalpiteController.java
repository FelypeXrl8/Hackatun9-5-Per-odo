package com.alfa.bolao.controller;

import com.alfa.bolao.dto.PalpiteRequest;
import com.alfa.bolao.dto.PalpiteResponse;
import com.alfa.bolao.service.PalpiteService;
import jakarta.validation.Valid;
import java.security.Principal;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/palpites")
public class PalpiteController {
    private final PalpiteService palpiteService;

    public PalpiteController(PalpiteService palpiteService) {
        this.palpiteService = palpiteService;
    }

    @GetMapping("/me")
    public List<PalpiteResponse> meusPalpites(Principal principal) {
        return palpiteService.meusPalpites(principal.getName());
    }

    @PostMapping
    public PalpiteResponse salvar(Principal principal, @RequestBody @Valid PalpiteRequest request) {
        return palpiteService.salvar(principal.getName(), request);
    }
}