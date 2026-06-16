import { StyleSheet, Text, View } from "react-native";

const ranking = [
  { position: 1, name: "Maria Santos", points: 35 },
  { position: 2, name: "João Silva", points: 30 },
  { position: 3, name: "Você", points: 25 },
];

export default function Ranking() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ranking Geral</Text>

      {ranking.map((item) => (
        <View key={item.position} style={[styles.row, item.name === "Você" && styles.highlight]}>
          <Text style={styles.position}>{item.position}º</Text>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.points}>{item.points} pts</Text>
        </View>
      ))}
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  highlight: {
    borderColor: "#16A34A",
    backgroundColor: "#DCFCE7",
  },
  position: {
    width: 42,
    fontSize: 18,
    fontWeight: "bold",
    color: "#0B5D1E",
  },
  name: {
    flex: 1,
    fontSize: 16,
    color: "#0F172A",
  },
  points: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#16A34A",
  },
});
