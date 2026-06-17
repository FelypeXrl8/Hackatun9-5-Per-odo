package com.alfa.bolao.api;

import com.alfa.bolao.dto.palpite.CriarPalpiteRequest;
import com.alfa.bolao.dto.palpite.PalpiteResponse;
import com.alfa.bolao.service.PalpiteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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
}