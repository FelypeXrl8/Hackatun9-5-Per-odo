package com.alfa.bolao.service;

import com.alfa.bolao.dto.selecao.SelecaoRequest;
import com.alfa.bolao.dto.selecao.SelecaoResponse;
import com.alfa.bolao.model.Selecao;
import com.alfa.bolao.repository.SelecaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SelecaoService {

    private final SelecaoRepository selecaoRepository;

    public List<SelecaoResponse> listar() {
        return selecaoRepository.findAll()
                .stream()
                .map(SelecaoResponse::new)
                .toList();
    }

    public SelecaoResponse detalhar(Long id) {
        Selecao selecao = buscarEntidadePorId(id);

        return new SelecaoResponse(selecao);
    }

    public SelecaoResponse criar(SelecaoRequest request) {
        Selecao selecao = Selecao.builder()
                .nome(request.nome())
                .codigoFifa(request.codigoFifa())
                .bandeira(request.bandeira())
                .grupo(request.grupo())
                .build();

        Selecao selecaoSalva = selecaoRepository.save(selecao);

        return new SelecaoResponse(selecaoSalva);
    }

    public SelecaoResponse atualizar(Long id, SelecaoRequest request) {
        Selecao selecao = buscarEntidadePorId(id);

        selecao.setNome(request.nome());
        selecao.setCodigoFifa(request.codigoFifa());
        selecao.setBandeira(request.bandeira());
        selecao.setGrupo(request.grupo());

        Selecao selecaoAtualizada = selecaoRepository.save(selecao);

        return new SelecaoResponse(selecaoAtualizada);
    }

    public void deletar(Long id) {
        Selecao selecao = buscarEntidadePorId(id);

        selecaoRepository.delete(selecao);
    }

    private Selecao buscarEntidadePorId(Long id) {
        return selecaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Seleção não encontrada"));
    }
}