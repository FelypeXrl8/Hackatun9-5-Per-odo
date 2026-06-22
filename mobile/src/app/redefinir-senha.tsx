import { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { colors } from "../constants/colors";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons"; 

export default function RedefinirSenha() {
  const [token, setToken] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [segundosRestantes, setSegundosRestantes] = useState(120);

  useEffect(() => {
    if (segundosRestantes <= 0) return;

    const intervalo = setInterval(() => {
      setSegundosRestantes((tempoAtual) => tempoAtual - 1);
    }, 1000);

    return () => clearInterval(intervalo);
  }, [segundosRestantes]);

  function formatarTempo() {
    const minutos = Math.floor(segundosRestantes / 60);
    const segundos = segundosRestantes % 60;
    return `${minutos.toString().padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;
  }

  async function handleRedefinir() {
    if (!token || !novaSenha) {
      alert("Preencha o código e a nova senha.");
      return;
    }

    try {
      setCarregando(true);
      
      await axios.post("http://localhost:8080/api/auth/redefinir-senha", {
        token: token.trim(),
        novaSenha: novaSenha
      });

      alert("Senha alterada com sucesso!");
      router.replace("/"); 

    } catch (error: any) {
      alert("Erro ao redefinir. Verifique se o código está correto ou se já expirou.");
    } finally {
      setCarregando(false);
    }
  }

  const tempoExpirado = segundosRestantes === 0;
  const bloquearCampos = carregando || tempoExpirado;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Senha</Text>
      <Text style={styles.subtitle}>Insira o código de 4 dígitos enviado e sua nova senha.</Text>

      <View style={[styles.timerContainer, tempoExpirado && styles.timerExpiradoContainer]}>
        <Text style={[styles.timerText, tempoExpirado && styles.timerExpiradoText]}>
          {tempoExpirado ? "Código expirado! Solicite outro." : `O código expira em: ${formatarTempo()}`}
        </Text>
      </View>

      <TextInput
        style={[styles.input, tempoExpirado && styles.inputDisabled]}
        placeholder="Digite o código de 4 dígitos"
        placeholderTextColor="#999"
        value={token}
        onChangeText={setToken}
        autoCapitalize="none"
        keyboardType="numeric"
        maxLength={4}
        editable={!bloquearCampos}
      />

      <View style={[styles.passwordContainer, tempoExpirado && styles.inputDisabled]}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Digite sua nova senha"
          placeholderTextColor="#999"
          secureTextEntry={!mostrarSenha}
          value={novaSenha}
          onChangeText={setNovaSenha}
          autoCapitalize="none"
          editable={!bloquearCampos}
        />
        <TouchableOpacity 
          style={styles.eyeIcon} 
          onPress={() => setMostrarSenha(!mostrarSenha)}
          disabled={bloquearCampos}
        >
          <Ionicons 
            name={mostrarSenha ? "eye-off-outline" : "eye-outline"} 
            size={22} 
            color="#666" 
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, bloquearCampos && styles.buttonDisabled]}
        onPress={handleRedefinir}
        disabled={bloquearCampos}
      >
        {carregando ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Alterar Senha</Text>}
      </TouchableOpacity>

      {tempoExpirado && (
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Voltar e gerar novo código</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 8, color: "#000" },
  subtitle: { fontSize: 14, color: "#666", marginBottom: 20 },
  timerContainer: { backgroundColor: "#e3f2fd", padding: 10, borderRadius: 8, marginBottom: 20, alignItems: "center" },
  timerText: { color: "#0d47a1", fontWeight: "bold", fontSize: 15 },
  timerExpiradoContainer: { backgroundColor: "#ffebee" },
  timerExpiradoText: { color: "#c62828" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 8, fontSize: 16, marginBottom: 16, color: "#000" },
  inputDisabled: { backgroundColor: "#f5f5f5", borderColor: "#e0e0e0" },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "#fff"
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: "#000"
  },
  eyeIcon: {
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  },
  button: { padding: 14, backgroundColor: colors.primary, borderRadius: 8, alignItems: "center", marginTop: 8 },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  backButton: { marginTop: 20, alignItems: "center" },
  backButtonText: { color: colors.primary, fontWeight: "bold", fontSize: 14 }
});
