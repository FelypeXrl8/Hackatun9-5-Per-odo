package com.alfa.bolao.api;

import com.alfa.bolao.dto.ranking.RankingResponse;
import com.alfa.bolao.service.RankingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/ranking")
@RequiredArgsConstructor
public class RankingApi {

    private final RankingService rankingService;

    @GetMapping
    public List<RankingResponse> listar() {
        return rankingService.listarRanking();
    }
}