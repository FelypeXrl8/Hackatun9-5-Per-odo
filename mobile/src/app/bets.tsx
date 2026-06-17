import { ScrollView, StyleSheet, Text, View } from "react-native";

const bets = [
  {
    id: 1,
    match: "Brasil x Argentina",
    bet: "2 x 1",
    result: "Aguardando resultado",
    points: "Pendente",
  },
  {
    id: 2,
    match: "França x Alemanha",
    bet: "1 x 1",
    result: "Aguardando resultado",
    points: "Pendente",
  },
];

export default function Bets() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Meus Palpites</Text>
      <Text style={styles.subtitle}>
        Acompanhe seus palpites e a pontuação após o resultado das partidas.
      </Text>

      {bets.map((bet) => (
        <View key={bet.id} style={styles.card}>
          <Text style={styles.match}>{bet.match}</Text>
          <Text style={styles.info}>Palpite: {bet.bet}</Text>
          <Text style={styles.info}>Resultado: {bet.result}</Text>
          <Text style={styles.points}>Pontuação: {bet.points}</Text>
        </View>
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
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  match: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 8,
  },
  info: {
    color: "#475569",
    marginBottom: 4,
  },
  points: {
    color: "#16A34A",
    fontWeight: "bold",
    marginTop: 8,
  },
});
