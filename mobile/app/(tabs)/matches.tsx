import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const matches = [
  { id: 1, teamA: "Brasil", teamB: "Argentina", date: "15/06/2026", time: "16:00", stadium: "MetLife Stadium" },
  { id: 2, teamA: "França", teamB: "Alemanha", date: "16/06/2026", time: "13:00", stadium: "Estádio Azteca" },
  { id: 3, teamA: "Portugal", teamB: "Espanha", date: "17/06/2026", time: "18:00", stadium: "SoFi Stadium" },
];

export default function Matches() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Partidas</Text>

      {matches.map((match) => (
        <TouchableOpacity
          key={match.id}
          style={styles.card}
          onPress={() => router.push(`/match/${match.id}`)}
        >
          <Text style={styles.teams}>{match.teamA} x {match.teamB}</Text>
          <Text style={styles.info}>{match.date} às {match.time}</Text>
          <Text style={styles.info}>{match.stadium}</Text>
          <Text style={styles.status}>Aberta para palpites</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 18,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  teams: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 8,
  },
  info: {
    fontSize: 14,
    color: "#475569",
  },
  status: {
    marginTop: 10,
    color: "#16A34A",
    fontWeight: "bold",
  },
});
