import { ScrollView, StyleSheet, Text, View } from "react-native";
import { getRanking } from "../services/rankingService";

export default function Ranking() {
  const ranking = getRanking();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Ranking Geral</Text>
      <Text style={styles.subtitle}>
        Classificação dos participantes por pontuação total.
      </Text>

      {ranking.map((item) => (
        <View
          key={item.position}
          style={[styles.row, item.name === "Você" && styles.highlight]}
        >
          <Text style={styles.position}>{item.position}º</Text>

          <View style={styles.userArea}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.exact}>
              Placares exatos: {item.exactScores}
            </Text>
          </View>

          <Text style={styles.points}>{item.points} pts</Text>
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  highlight: {
    backgroundColor: "#DCFCE7",
    borderColor: "#16A34A",
  },
  position: {
    width: 44,
    fontSize: 18,
    fontWeight: "bold",
    color: "#0B5D1E",
  },
  userArea: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0F172A",
  },
  exact: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 3,
  },
  points: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#16A34A",
  },
});
