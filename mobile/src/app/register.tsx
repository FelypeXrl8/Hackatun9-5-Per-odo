import { Link } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";
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
      await register(nome, email, senha);
    } catch (error: any) {
      const mensagem = error?.response?.data?.message || "Não foi possível criar a conta.";
      Alert.alert("Erro no cadastro", mensagem);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar conta</Text>
      <Text style={styles.subtitle}>Cadastre-se para participar do bolão</Text>
      <TextInput style={styles.input} placeholder="Nome" placeholderTextColor={colors.muted} value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="E-mail" placeholderTextColor={colors.muted} keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Senha" placeholderTextColor={colors.muted} secureTextEntry value={senha} onChangeText={setSenha} />
      <TouchableOpacity style={[styles.button, carregando && styles.buttonDisabled]} activeOpacity={0.8} onPress={handleCadastro} disabled={carregando}>
        {carregando ? <ActivityIndicator color={colors.white} /> : <Text style={styles.buttonText}>Cadastrar</Text>}
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
  container: { flex: 1, backgroundColor: colors.primary, padding: 24, justifyContent: "center" },
  title: { color: colors.accent, fontSize: 32, fontWeight: "bold", textAlign: "center", marginBottom: 8 },
  subtitle: { color: colors.white, fontSize: 16, textAlign: "center", marginBottom: 32 },
  input: { backgroundColor: colors.white, borderRadius: 14, padding: 15, fontSize: 16, marginBottom: 14 },
  button: { backgroundColor: colors.secondary, borderRadius: 14, padding: 16, alignItems: "center", marginTop: 8 },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: colors.white, fontSize: 16, fontWeight: "bold" },
  link: { color: colors.accent, textAlign: "center", marginTop: 20, fontSize: 15, fontWeight: "bold" },
});