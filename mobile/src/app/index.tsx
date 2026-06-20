import { Link } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuth } from "../contexts/authContext";

export default function Login() {
  // Estado local para os campos do formulário
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  // Pegamos a função login do contexto
  const { login } = useAuth();

  async function handleLogin() {
    if (!email || !senha) {
      Alert.alert("Atenção", "Informe e-mail e senha.");
      return;
    }

    try {
      setCarregando(true);
      // Chama o AuthContext que chama a API e salva o token.
      // Se der certo, o próprio contexto navega para /home.
      await login(email, senha);
    } catch {
      // O backend retornou erro (credenciais inválidas, servidor offline, etc.)
      Alert.alert("Erro ao entrar", "E-mail ou senha incorretos. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Bolão Copa 2026</Text>
      <Text style={styles.subtitle}>Entre para registrar seus palpites</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#64748B"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#64748B"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity
        style={[styles.button, carregando && styles.buttonDisabled]}
        activeOpacity={0.8}
        onPress={handleLogin}
        disabled={carregando}
      >
        {carregando ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>

      <Link href="/register" asChild>
        <TouchableOpacity activeOpacity={0.8}>
          <Text style={styles.link}>Ainda não tenho conta</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    padding: 24,
    justifyContent: "center",
  },
  logo: {
    color: "#FACC15",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    color: "#E2E8F0",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 32,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 14,
  },
  button: {
    backgroundColor: "#16A34A",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    color: "#FACC15",
    textAlign: "center",
    marginTop: 20,
    fontSize: 15,
  },
});