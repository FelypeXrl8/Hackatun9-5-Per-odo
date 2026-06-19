package com.alfa.bolao.dto.partida;

import java.util.List;

public record PartidasPorFaseResponse(
        String fase,
        List<PartidaResponse> partidas
) {}