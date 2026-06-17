import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { matches } from "../mocks/matches";

export default function Matches() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Partidas</Text>
      <Text style={styles.subtitle}>
        Escolha uma partida para registrar seu palpite.
      </Text>

      {matches.map((match) => (
        <TouchableOpacity
          key={match.id}
          style={styles.card}
          activeOpacity={0.8}
          onPress={() =>
            router.push({
              pathname: "/match/[id]",
              params: { id: match.id },
            })
          }
        >
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

          <Text style={styles.info}>{match.phase}</Text>
          <Text style={styles.info}>{match.date} às {match.time}</Text>
          <Text style={styles.info}>{match.stadium}</Text>

          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{match.status}</Text>
          </View>
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
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  teamsArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
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
    fontSize: 16,
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
    marginBottom: 4,
  },
  statusBadge: {
    backgroundColor: "#FACC15",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    marginTop: 10,
  },
  statusText: {
    color: "#0F172A",
    fontWeight: "bold",
    fontSize: 13,
  },
});
