package com.alfa.bolao.service;

import com.alfa.bolao.dto.SelecaoRequest;
import com.alfa.bolao.dto.SelecaoResponse;
import com.alfa.bolao.entity.Selecao;
import com.alfa.bolao.exception.BusinessException;
import com.alfa.bolao.exception.NotFoundException;
import com.alfa.bolao.repository.SelecaoRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class SelecaoService {
    private final SelecaoRepository selecaoRepository;

    public SelecaoService(SelecaoRepository selecaoRepository) {
        this.selecaoRepository = selecaoRepository;
    }

    public List<SelecaoResponse> listar() {
        return selecaoRepository.findAll().stream().map(SelecaoResponse::from).toList();
    }

    public Selecao buscarEntidade(Long id) {
        return selecaoRepository.findById(id).orElseThrow(() -> new NotFoundException("Seleção não encontrada."));
    }

    public SelecaoResponse criar(SelecaoRequest request) {
        String codigo = request.codigoFifa().toUpperCase();
        if (selecaoRepository.existsByCodigoFifa(codigo)) {
            throw new BusinessException("Já existe uma seleção com este código FIFA.");
        }
        Selecao selecao = new Selecao();
        selecao.setNome(request.nome());
        selecao.setCodigoFifa(codigo);
        selecao.setUrlImagem(request.urlImagem());
        selecao.setGrupo(request.grupo());
        return SelecaoResponse.from(selecaoRepository.save(selecao));
    }

    public SelecaoResponse atualizar(Long id, SelecaoRequest request) {
        Selecao selecao = buscarEntidade(id);
        selecao.setNome(request.nome());
        selecao.setCodigoFifa(request.codigoFifa().toUpperCase());
        selecao.setUrlImagem(request.urlImagem());
        selecao.setGrupo(request.grupo());
        return SelecaoResponse.from(selecaoRepository.save(selecao));
    }

    public void remover(Long id) {
        selecaoRepository.delete(buscarEntidade(id));
    }
}