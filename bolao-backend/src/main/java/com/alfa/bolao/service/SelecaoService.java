package com.alfa.bolao.service;

import com.alfa.bolao.dto.SelecaoRequest;
import com.alfa.bolao.dto.SelecaoResponse;
import com.alfa.bolao.entity.Selecao;
import com.alfa.bolao.exception.BusinessException;
import com.alfa.bolao.exception.NotFoundException;
import com.alfa.bolao.repository.PartidaRepository;
import com.alfa.bolao.repository.SelecaoRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SelecaoService {
    private final SelecaoRepository selecaoRepository;
    private final PartidaRepository partidaRepository;

    public SelecaoService(SelecaoRepository selecaoRepository, PartidaRepository partidaRepository) {
        this.selecaoRepository = selecaoRepository;
        this.partidaRepository = partidaRepository;
    }

    public List<SelecaoResponse> listar() {
        return selecaoRepository.findAll().stream().map(SelecaoResponse::from).toList();
    }

    public Selecao buscarEntidade(Long id) {
        return selecaoRepository.findById(id).orElseThrow(() -> new NotFoundException("Seleção não encontrada."));
    }

    @Transactional
    public SelecaoResponse criar(SelecaoRequest request) {
        String codigo = normalizarCodigo(request.codigoFifa());
        if (selecaoRepository.existsByCodigoFifa(codigo)) {
            throw new BusinessException("Já existe uma seleção com este código FIFA.");
        }
        Selecao selecao = new Selecao();
        selecao.setNome(request.nome().trim());
        selecao.setCodigoFifa(codigo);
        selecao.setUrlImagem(limpar(request.urlImagem()));
        selecao.setGrupo(limpar(request.grupo()));
        return SelecaoResponse.from(selecaoRepository.save(selecao));
    }

    @Transactional
    public SelecaoResponse atualizar(Long id, SelecaoRequest request) {
        String codigo = normalizarCodigo(request.codigoFifa());
        if (selecaoRepository.existsByCodigoFifaAndIdNot(codigo, id)) {
            throw new BusinessException("Já existe outra seleção com este código FIFA.");
        }
        Selecao selecao = buscarEntidade(id);
        selecao.setNome(request.nome().trim());
        selecao.setCodigoFifa(codigo);
        selecao.setUrlImagem(limpar(request.urlImagem()));
        selecao.setGrupo(limpar(request.grupo()));
        return SelecaoResponse.from(selecaoRepository.save(selecao));
    }

    @Transactional
    public void remover(Long id) {
        Selecao selecao = buscarEntidade(id);
        if (partidaRepository.existsBySelecaoAOrSelecaoB(selecao, selecao)) {
            throw new BusinessException("Não é possível remover uma seleção que já está vinculada a partidas. Remova ou edite as partidas primeiro.");
        }
        selecaoRepository.delete(selecao);
    }

    private String normalizarCodigo(String codigoFifa) {
        return codigoFifa.trim().toUpperCase();
    }

    private String limpar(String valor) {
        if (valor == null || valor.trim().isEmpty()) {
            return null;
        }
        return valor.trim();
    }
}
