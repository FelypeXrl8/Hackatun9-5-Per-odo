import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const matches = [
  {
    id: "1",
    teamA: "Brasil",
    teamB: "Argentina",
    codeA: "BRA",
    codeB: "ARG",
    date: "15/06/2026",
    time: "16:00",
    stadium: "MetLife Stadium",
  },
  {
    id: "2",
    teamA: "França",
    teamB: "Alemanha",
    codeA: "FRA",
    codeB: "ALE",
    date: "16/06/2026",
    time: "13:00",
    stadium: "Estádio Azteca",
  },
  {
    id: "3",
    teamA: "Portugal",
    teamB: "Espanha",
    codeA: "POR",
    codeB: "ESP",
    date: "17/06/2026",
    time: "18:00",
    stadium: "SoFi Stadium",
  },
];

export default function MatchDetails() {
  const { id } = useLocalSearchParams();

  const match = matches.find((item) => item.id === String(id)) || matches[0];

  const [goalsA, setGoalsA] = useState("");
  const [goalsB, setGoalsB] = useState("");

  function handleSaveBet() {
    if (goalsA === "" || goalsB === "") {
      Alert.alert("Atenção", "Informe os gols das duas seleções.");
      return;
    }

    Alert.alert(
      "Palpite salvo",
      `Seu palpite para ${match.teamA} x ${match.teamB} foi ${goalsA} x ${goalsB}.`
    );

    router.push("/bets");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Palpite</Text>
      <Text style={styles.subtitle}>
        Informe o placar antes do início da partida.
      </Text>

      <View style={styles.card}>
        <View style={styles.teamsArea}>
          <View style={styles.teamBox}>
            <Text style={styles.code}>{match.codeA}</Text>
            <Text style={styles.team}>{match.teamA}</Text>
          </View>

          <Text style={styles.vs}>x</Text>

          <View style={styles.teamBox}>
            <Text style={styles.code}>{match.codeB}</Text>
            <Text style={styles.team}>{match.teamB}</Text>
          </View>
        </View>

        <Text style={styles.info}>Data: {match.date} às {match.time}</Text>
        <Text style={styles.info}>Estádio: {match.stadium}</Text>

        <View style={styles.scoreArea}>
          <TextInput
            style={styles.scoreInput}
            keyboardType="numeric"
            value={goalsA}
            onChangeText={setGoalsA}
            maxLength={2}
            placeholder="0"
            placeholderTextColor="#94A3B8"
          />

          <Text style={styles.scoreVs}>x</Text>

          <TextInput
            style={styles.scoreInput}
            keyboardType="numeric"
            value={goalsB}
            onChangeText={setGoalsB}
            maxLength={2}
            placeholder="0"
            placeholderTextColor="#94A3B8"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSaveBet} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Salvar Palpite</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: "#64748B",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  teamsArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  teamBox: {
    flex: 1,
    alignItems: "center",
  },
  code: {
    backgroundColor: "#DCFCE7",
    color: "#0B5D1E",
    fontWeight: "bold",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 8,
  },
  team: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#0F172A",
    textAlign: "center",
  },
  vs: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#64748B",
    marginHorizontal: 12,
  },
  info: {
    color: "#475569",
    textAlign: "center",
    marginBottom: 4,
  },
  scoreArea: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 28,
  },
  scoreInput: {
    width: 76,
    height: 76,
    borderRadius: 18,
    backgroundColor: "#F1F5F9",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "#0F172A",
  },
  scoreVs: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#0F172A",
    marginHorizontal: 18,
  },
  button: {
    backgroundColor: "#16A34A",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
