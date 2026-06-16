import { useLocalSearchParams, router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function MatchDetails() {
  const { id } = useLocalSearchParams();

  const [goalsA, setGoalsA] = useState("");
  const [goalsB, setGoalsB] = useState("");

  function handleSaveBet() {
    if (goalsA === "" || goalsB === "") {
      Alert.alert("Atenção", "Informe os gols das duas seleções.");
      return;
    }

    Alert.alert("Palpite salvo", `Seu palpite foi registrado: ${goalsA} x ${goalsB}`);
    router.push("/(tabs)/bets");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Palpite</Text>
      <Text style={styles.subtitle}>Partida #{id}</Text>

      <View style={styles.card}>
        <Text style={styles.teams}>Brasil x Argentina</Text>
        <Text style={styles.info}>Data: 15/06/2026 às 16:00</Text>
        <Text style={styles.info}>Estádio: MetLife Stadium</Text>

        <View style={styles.scoreArea}>
          <TextInput
            style={styles.scoreInput}
            keyboardType="numeric"
            value={goalsA}
            onChangeText={setGoalsA}
            maxLength={2}
          />

          <Text style={styles.vs}>x</Text>

          <TextInput
            style={styles.scoreInput}
            keyboardType="numeric"
            value={goalsB}
            onChangeText={setGoalsB}
            maxLength={2}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSaveBet}>
          <Text style={styles.buttonText}>Salvar Palpite</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8FAFC",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 4,
  },
  subtitle: {
    color: "#64748B",
    marginBottom: 18,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  teams: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0F172A",
    textAlign: "center",
    marginBottom: 12,
  },
  info: {
    color: "#475569",
    textAlign: "center",
    marginBottom: 4,
  },
  scoreArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 28,
  },
  scoreInput: {
    width: 72,
    height: 72,
    borderRadius: 16,
    backgroundColor: "#F1F5F9",
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    color: "#0F172A",
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },
  vs: {
    fontSize: 28,
    fontWeight: "bold",
    marginHorizontal: 18,
    color: "#0F172A",
  },
  button: {
    backgroundColor: "#16A34A",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
