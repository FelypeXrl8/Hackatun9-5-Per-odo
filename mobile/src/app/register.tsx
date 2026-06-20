import { Link } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuth } from "../contexts/authContext";

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  const { register } = useAuth();

  async function handleCadastro() {
    if (!nome || !email || !senha) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    if (senha.length < 6) {
      Alert.alert("Atenção", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      setCarregando(true);
      // register() faz o cadastro e já loga em seguida, navegando para /home.
      await register(nome, email, senha);
    } catch (error: any) {
      // Se o e-mail já estiver cadastrado o backend retorna 409, por exemplo.
      const mensagem =
        error?.response?.data?.message || "Não foi possível criar a conta. Tente novamente.";
      Alert.alert("Erro no cadastro", mensagem);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar conta</Text>
      <Text style={styles.subtitle}>Cadastre-se para participar do bolão</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#64748B"
        value={nome}
        onChangeText={setNome}
      />

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
        onPress={handleCadastro}
        disabled={carregando}
      >
        {carregando ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Cadastrar</Text>
        )}
      </TouchableOpacity>

      <Link href="/" asChild>
        <TouchableOpacity activeOpacity={0.8}>
          <Text style={styles.link}>Voltar para login</Text>
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
  title: {
    color: "#FACC15",
    fontSize: 30,
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