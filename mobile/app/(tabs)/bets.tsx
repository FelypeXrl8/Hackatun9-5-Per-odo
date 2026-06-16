import { StyleSheet, Text, View } from "react-native";

export default function Bets() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Palpites</Text>
      <View style={styles.card}>
        <Text style={styles.match}>Brasil 2 x 1 Argentina</Text>
        <Text style={styles.info}>Status: aguardando resultado</Text>
        <Text style={styles.points}>Pontuação: pendente</Text>
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
    marginBottom: 18,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
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
  },
  points: {
    marginTop: 8,
    color: "#16A34A",
    fontWeight: "bold",
  },
});
