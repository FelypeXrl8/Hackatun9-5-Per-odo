package com.alfa.bolao.dto;

import com.alfa.bolao.entity.Selecao;

public record SelecaoResponse(
    Long id,
    String nome,
    String codigoFifa,
    String urlImagem,
    String grupo
) {
    public static SelecaoResponse from(Selecao selecao) {
        return new SelecaoResponse(
            selecao.getId(),
            selecao.getNome(),
            selecao.getCodigoFifa(),
            selecao.getUrlImagem(),
            selecao.getGrupo()
        );
    }
}