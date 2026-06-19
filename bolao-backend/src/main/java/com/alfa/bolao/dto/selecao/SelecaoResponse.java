package com.alfa.bolao.dto.selecao;

import com.alfa.bolao.model.Selecao;

public record SelecaoResponse(
        Long id,
        String nome,
        String codigoFifa,
        String bandeira,
        String grupo
) {
    public SelecaoResponse(Selecao selecao) {
        this(
                selecao.getId(),
                selecao.getNome(),
                selecao.getCodigoFifa(),
                selecao.getBandeira(),
                selecao.getGrupo()
        );
    }
}