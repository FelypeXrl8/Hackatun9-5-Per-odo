import { useState } from "react";
 import { router } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { colors } from "../constants/colors";
import axios from "axios";


const API_URL = "http://localhost:8080/api/auth/esqueci-senha"; 

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [carregando, setCarregando] = useState(false);

 async function enviar() {
  if (!email) {
    alert("Por favor, digite o seu e-mail.");
    return;
  }

  try {
    setCarregando(true);
    const response = await axios.post(API_URL, { email });


    alert("Token gerado! Copie este código para usar na próxima tela:\n\n" + response.data);

    
    router.push("/redefinir-senha"); 

  } catch (error: any) {
    alert("Erro ao gerar token. Verifique o e-mail digitado.");
  } finally {
    setCarregando(false);
  }
}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar senha</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        placeholderTextColor={colors.muted || "#999"}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        editable={!carregando}
      />

      <TouchableOpacity
        style={[styles.button, carregando && styles.buttonDisabled]}
        onPress={enviar}
        disabled={carregando}
        activeOpacity={0.8}
      >
        {carregando ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Enviar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000"
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    color: "#000"
  },
  button: {
    marginTop: 20,
    padding: 14,
    backgroundColor: colors.primary,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonDisabled: {
    opacity: 0.6
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold"
  }
});
