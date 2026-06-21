package com.alfa.bolao.controller;

import com.alfa.bolao.dto.PartidaRequest;
import com.alfa.bolao.dto.ResultadoRequest;
import com.alfa.bolao.dto.SelecaoRequest;
import com.alfa.bolao.entity.StatusPartida;
import com.alfa.bolao.repository.PalpiteRepository;
import com.alfa.bolao.repository.PartidaRepository;
import com.alfa.bolao.repository.SelecaoRepository;
import com.alfa.bolao.repository.UsuarioRepository;
import com.alfa.bolao.service.PartidaService;
import com.alfa.bolao.service.SelecaoService;
import java.time.LocalDateTime;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class AdminWebController {
    private final UsuarioRepository usuarioRepository;
    private final PalpiteRepository palpiteRepository;
    private final PartidaRepository partidaRepository;
    private final SelecaoRepository selecaoRepository;
    private final SelecaoService selecaoService;
    private final PartidaService partidaService;

    public AdminWebController(UsuarioRepository usuarioRepository, PalpiteRepository palpiteRepository, PartidaRepository partidaRepository, SelecaoRepository selecaoRepository, SelecaoService selecaoService, PartidaService partidaService) {
        this.usuarioRepository = usuarioRepository;
        this.palpiteRepository = palpiteRepository;
        this.partidaRepository = partidaRepository;
        this.selecaoRepository = selecaoRepository;
        this.selecaoService = selecaoService;
        this.partidaService = partidaService;
    }

    @GetMapping("/login")
    public String login() {
        return "admin/login";
    }

    @GetMapping
    public String dashboard(Model model) {
        model.addAttribute("totalUsuarios", usuarioRepository.count());
        model.addAttribute("totalPalpites", palpiteRepository.count());
        model.addAttribute("pendentes", partidaRepository.countByStatus(StatusPartida.AGENDADA));
        model.addAttribute("usuarios24h", usuarioRepository.countByCriadoEmAfter(LocalDateTime.now().minusHours(24)));
        return "admin/dashboard";
    }

    @GetMapping("/selecoes")
    public String selecoes(Model model) {
        model.addAttribute("selecoes", selecaoRepository.findAll());
        return "admin/selecoes";
    }

    @PostMapping("/selecoes")
    public String criarSelecao(String nome, String codigoFifa, String urlImagem, String grupo) {
        selecaoService.criar(new SelecaoRequest(nome, codigoFifa, urlImagem, grupo));
        return "redirect:/admin/selecoes";
    }

    @GetMapping("/partidas")
    public String partidas(Model model) {
        model.addAttribute("partidas", partidaRepository.findAllByOrderByDataHoraAsc());
        model.addAttribute("selecoes", selecaoRepository.findAll());
        return "admin/partidas";
    }

    @PostMapping("/partidas")
    public String criarPartida(Long selecaoAId, Long selecaoBId, @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime dataHora, String estadio, String fase, String grupo) {
        partidaService.criar(new PartidaRequest(selecaoAId, selecaoBId, dataHora, estadio, fase, grupo));
        return "redirect:/admin/partidas";
    }

    @PostMapping("/partidas/{id}/resultado")
    public String resultado(@PathVariable Long id, Integer golsA, Integer golsB) {
        partidaService.lancarResultado(id, new ResultadoRequest(golsA, golsB));
        return "redirect:/admin/partidas";
    }

    @GetMapping("/usuarios")
    public String usuarios(Model model) {
        model.addAttribute("usuarios", usuarioRepository.findAll());
        return "admin/usuarios";
    }
}