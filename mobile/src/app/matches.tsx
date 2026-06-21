import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";
import { getMatches, type Match } from "../services/matchService";

function formatDate(value: string) {
  const date = new Date(value);
  return date.toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function Matches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    try {
      setLoading(true);
      setMatches(await getMatches());
    } catch {
      Alert.alert("Erro", "Não foi possível carregar as partidas. Confira se o backend está rodando.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <View style={styles.loading}><ActivityIndicator color={colors.primary} size="large" /></View>;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Partidas</Text>
      <Text style={styles.subtitle}>Escolha uma partida para registrar seu palpite.</Text>

      {matches.map((match) => (
        <TouchableOpacity key={match.id} style={styles.card} activeOpacity={0.8} onPress={() => router.push({ pathname: "/match/[id]", params: { id: String(match.id) } })}>
          <View style={styles.teamsArea}>
            <View style={styles.teamBox}><Text style={styles.code}>{match.selecaoA.codigoFifa}</Text><Text style={styles.team}>{match.selecaoA.nome}</Text></View>
            <Text style={styles.vs}>x</Text>
            <View style={styles.teamBox}><Text style={styles.code}>{match.selecaoB.codigoFifa}</Text><Text style={styles.team}>{match.selecaoB.nome}</Text></View>
          </View>
          <Text style={styles.info}>{match.fase}</Text>
          <Text style={styles.info}>{formatDate(match.dataHora)}</Text>
          <Text style={styles.info}>{match.estadio}</Text>
          <View style={[styles.statusBadge, !match.abertaParaPalpite && styles.statusClosed]}>
            <Text style={styles.statusText}>{match.abertaParaPalpite ? "Aberta para palpites" : match.status}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.background },
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20 },
  title: { fontSize: 30, fontWeight: "bold", color: colors.text, marginBottom: 6 },
  subtitle: { fontSize: 15, color: colors.muted, marginBottom: 20 },
  card: { backgroundColor: colors.white, borderRadius: 18, padding: 18, marginBottom: 16, borderWidth: 1, borderColor: colors.border },
  teamsArea: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 },
  teamBox: { flex: 1, alignItems: "center" },
  code: { backgroundColor: "#e8f7f2", color: colors.primary, fontWeight: "bold", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, marginBottom: 8 },
  team: { fontSize: 16, fontWeight: "bold", color: colors.text, textAlign: "center" },
  vs: { fontSize: 22, fontWeight: "bold", color: colors.muted, marginHorizontal: 12 },
  info: { color: colors.muted, marginBottom: 4 },
  statusBadge: { backgroundColor: colors.accent, alignSelf: "flex-start", paddingHorizontal: 12, paddingVertical: 7, borderRadius: 999, marginTop: 10 },
  statusClosed: { backgroundColor: colors.border },
  statusText: { color: colors.dark, fontWeight: "bold", fontSize: 13 },
});