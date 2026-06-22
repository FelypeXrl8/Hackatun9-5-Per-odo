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
import com.alfa.bolao.service.UsuarioService;
import java.time.LocalDateTime;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/admin")
public class AdminWebController {
    private final UsuarioRepository usuarioRepository;
    private final PalpiteRepository palpiteRepository;
    private final PartidaRepository partidaRepository;
    private final SelecaoRepository selecaoRepository;
    private final SelecaoService selecaoService;
    private final PartidaService partidaService;
    private final UsuarioService usuarioService;

    public AdminWebController(UsuarioRepository usuarioRepository, PalpiteRepository palpiteRepository, PartidaRepository partidaRepository, SelecaoRepository selecaoRepository, SelecaoService selecaoService, PartidaService partidaService, UsuarioService usuarioService) {
        this.usuarioRepository = usuarioRepository;
        this.palpiteRepository = palpiteRepository;
        this.partidaRepository = partidaRepository;
        this.selecaoRepository = selecaoRepository;
        this.selecaoService = selecaoService;
        this.partidaService = partidaService;
        this.usuarioService = usuarioService;
    }

    @GetMapping("/login")
    public String login() {
        return "admin/login";
    }

    @GetMapping
    public String dashboard(Model model) {
        model.addAttribute("totalUsuarios", usuarioRepository.count());
        model.addAttribute("totalSelecoes", selecaoRepository.count());
        model.addAttribute("totalPartidas", partidaRepository.count());
        model.addAttribute("totalPalpites", palpiteRepository.count());
        model.addAttribute("pendentes", partidaRepository.countByStatus(StatusPartida.AGENDADA));
        model.addAttribute("encerradas", partidaRepository.countByStatus(StatusPartida.ENCERRADA));
        model.addAttribute("usuarios24h", usuarioRepository.countByCriadoEmAfter(LocalDateTime.now().minusHours(24)));
        model.addAttribute("ranking", usuarioService.ranking());
        return "admin/dashboard";
    }

    @GetMapping("/selecoes")
    public String selecoes(Model model) {
        model.addAttribute("selecoes", selecaoRepository.findAll());
        return "admin/selecoes";
    }

    @PostMapping("/selecoes")
    public String criarSelecao(String nome, String codigoFifa, String urlImagem, String grupo, RedirectAttributes redirectAttributes) {
        try {
            selecaoService.criar(new SelecaoRequest(nome, codigoFifa, urlImagem, grupo));
            redirectAttributes.addFlashAttribute("success", "Seleção cadastrada com sucesso.");
        } catch (RuntimeException exception) {
            redirectAttributes.addFlashAttribute("error", exception.getMessage());
        }
        return "redirect:/admin/selecoes";
    }

    @PostMapping("/selecoes/{id}")
    public String atualizarSelecao(@PathVariable Long id, String nome, String codigoFifa, String urlImagem, String grupo, RedirectAttributes redirectAttributes) {
        try {
            selecaoService.atualizar(id, new SelecaoRequest(nome, codigoFifa, urlImagem, grupo));
            redirectAttributes.addFlashAttribute("success", "Seleção atualizada com sucesso.");
        } catch (RuntimeException exception) {
            redirectAttributes.addFlashAttribute("error", exception.getMessage());
        }
        return "redirect:/admin/selecoes";
    }

    @PostMapping("/selecoes/{id}/remover")
    public String removerSelecao(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        try {
            selecaoService.remover(id);
            redirectAttributes.addFlashAttribute("success", "Seleção removida com sucesso.");
        } catch (RuntimeException exception) {
            redirectAttributes.addFlashAttribute("error", exception.getMessage());
        }
        return "redirect:/admin/selecoes";
    }

    @GetMapping("/partidas")
    public String partidas(Model model) {
        model.addAttribute("partidas", partidaRepository.findAllByOrderByDataHoraAsc());
        model.addAttribute("selecoes", selecaoRepository.findAll());
        return "admin/partidas";
    }

    @PostMapping("/partidas")
    public String criarPartida(Long selecaoAId, Long selecaoBId, @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime dataHora, String estadio, String fase, String grupo, RedirectAttributes redirectAttributes) {
        try {
            partidaService.criar(new PartidaRequest(selecaoAId, selecaoBId, dataHora, estadio, fase, grupo));
            redirectAttributes.addFlashAttribute("success", "Partida cadastrada com sucesso.");
        } catch (RuntimeException exception) {
            redirectAttributes.addFlashAttribute("error", exception.getMessage());
        }

        return "redirect:/admin/partidas";
    }

    @PostMapping("/partidas/{id}")
    public String atualizarPartida(@PathVariable Long id, Long selecaoAId, Long selecaoBId, @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime dataHora, String estadio, String fase, String grupo, RedirectAttributes redirectAttributes) {
        try {
            partidaService.atualizar(id, new PartidaRequest(selecaoAId, selecaoBId, dataHora, estadio, fase, grupo));
            redirectAttributes.addFlashAttribute("success", "Partida atualizada com sucesso.");
        } catch (RuntimeException exception) {
            redirectAttributes.addFlashAttribute("error", exception.getMessage());
        }

        return "redirect:/admin/partidas";
    }

    @PostMapping("/partidas/{id}/resultado")
    public String resultado(@PathVariable Long id, Integer golsA, Integer golsB, RedirectAttributes redirectAttributes) {
        try {
            partidaService.lancarResultado(id, new ResultadoRequest(golsA, golsB));
            redirectAttributes.addFlashAttribute("success", "Resultado salvo e ranking recalculado.");
        } catch (RuntimeException exception) {
            redirectAttributes.addFlashAttribute("error", exception.getMessage());
        }

        return "redirect:/admin/partidas";
    }

    @PostMapping("/partidas/{id}/resultado/limpar")
    public String limparResultado(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        try {
            partidaService.limparResultado(id);
            redirectAttributes.addFlashAttribute("success", "Resultado removido e ranking recalculado.");
        } catch (RuntimeException exception) {
            redirectAttributes.addFlashAttribute("error", exception.getMessage());
        }

        return "redirect:/admin/partidas";
    }

    @PostMapping("/partidas/{id}/remover")
    public String removerPartida(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        try {
            partidaService.remover(id);
            redirectAttributes.addFlashAttribute("success", "Partida removida e ranking recalculado.");
        } catch (RuntimeException exception) {
            redirectAttributes.addFlashAttribute("error", exception.getMessage());
        }

        return "redirect:/admin/partidas";
    }

    @GetMapping("/usuarios")
    public String usuarios(Model model) {
        model.addAttribute("usuarios", usuarioRepository.findAllByOrderByPontuacaoTotalDescPlacaresExatosDescCriadoEmAsc());
        return "admin/usuarios";
    }

    @PostMapping("/usuarios/{id}/bloqueio")
    public String alterarBloqueio(@PathVariable Long id, boolean bloqueado, RedirectAttributes redirectAttributes) {
        try {
            usuarioService.alterarBloqueio(id, bloqueado);
            redirectAttributes.addFlashAttribute("success", bloqueado ? "Usuário bloqueado com sucesso." : "Usuário desbloqueado com sucesso.");
        } catch (RuntimeException exception) {
            redirectAttributes.addFlashAttribute("error", exception.getMessage());
        }
        return "redirect:/admin/usuarios";
    }
}
