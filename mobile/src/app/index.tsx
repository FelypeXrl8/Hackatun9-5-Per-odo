import { Link } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";
import { useAuth } from "../contexts/authContext";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  const [email, setEmail] = useState("renan@bolao.com");
  const [senha, setSenha] = useState("123456");
  const [carregando, setCarregando] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const { login } = useAuth();

  async function handleLogin() {
    if (!email || !senha) {
      Alert.alert("Atenção", "Informe e-mail e senha.");
      return;
    }
    try {
      setCarregando(true);
      await login(email, senha);
    } catch (error: any) {
      const mensagem = error?.response?.data?.message || "Confira se o backend está rodando em http://localhost:8080.";
      Alert.alert("Erro ao entrar", mensagem);
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
        placeholderTextColor={colors.muted} 
        keyboardType="email-address" 
        autoCapitalize="none" 
        value={email} 
        onChangeText={setEmail} 
      />

      <View style={styles.passwordContainer}>
        <TextInput 
          style={styles.passwordInput} 
          placeholder="Senha" 
          placeholderTextColor={colors.muted} 
          secureTextEntry={!mostrarSenha} 
          value={senha} 
          onChangeText={setSenha} 
        />
        <TouchableOpacity style={styles.eyeIcon} onPress={() => setMostrarSenha(!mostrarSenha)}>
          <Ionicons 
            name={mostrarSenha ? "eye-off-outline" : "eye-outline"} 
            size={22} 
            color={colors.muted || "#666"} 
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={[styles.button, carregando && styles.buttonDisabled]} 
        activeOpacity={0.8} 
        onPress={handleLogin} 
        disabled={carregando}
      >
        {carregando ? <ActivityIndicator color={colors.white} /> : <Text style={styles.buttonText}>Entrar</Text>}
      </TouchableOpacity>

      <Link href="/forgot-password" asChild>
        <TouchableOpacity activeOpacity={0.8}>
          <Text style={styles.link}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/ranking" asChild>
        <TouchableOpacity activeOpacity={0.8}>
          <Text style={styles.link}>Ranking</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/register" asChild>
        <TouchableOpacity activeOpacity={0.8}>
          <Text style={styles.link}>Ainda não tenho conta</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.primary, padding: 24, justifyContent: "center" },
  logo: { color: colors.accent, fontSize: 34, fontWeight: "bold", textAlign: "center", marginBottom: 8 },
  subtitle: { color: colors.white, fontSize: 16, textAlign: "center", marginBottom: 32 },
  input: { backgroundColor: colors.white, borderRadius: 14, padding: 15, fontSize: 16, marginBottom: 14 },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 14,
    marginBottom: 14,
  },
  passwordInput: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },
  eyeIcon: {
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  button: { backgroundColor: colors.secondary, borderRadius: 14, padding: 16, alignItems: "center", marginTop: 8 },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: colors.white, fontSize: 16, fontWeight: "bold" },
  link: { color: colors.accent, textAlign: "center", marginTop: 20, fontSize: 15, fontWeight: "bold" },
});
