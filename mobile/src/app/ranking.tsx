import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";
import { useAuth } from "../contexts/authContext";
import { getRanking, type RankingItem } from "../services/rankingService";

export default function Ranking() {
  const [ranking, setRanking] = useState<RankingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { usuario } = useAuth();

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    try {
      setLoading(true);
      setRanking(await getRanking());
    } catch {
      Alert.alert("Erro", "Não foi possível carregar o ranking.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <View style={styles.loading}><ActivityIndicator color={colors.primary} size="large" /></View>;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Ranking Geral</Text>
      <Text style={styles.subtitle}>Classificação dos participantes por pontuação total.</Text>

      {ranking.map((item) => (
        <View key={item.usuarioId} style={[styles.row, item.usuarioId === usuario?.id && styles.highlight]}>
          <Text style={styles.position}>{item.position}º</Text>
          <View style={styles.userArea}>
            <Text style={styles.name}>{item.nome}</Text>
            <Text style={styles.exact}>Placares exatos: {item.exactScores}</Text>
          </View>
          <Text style={styles.points}>{item.points} pts</Text>
        </View>
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
  row: { flexDirection: "row", alignItems: "center", backgroundColor: colors.white, borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: colors.border },
  highlight: { backgroundColor: "#e8f7f2", borderColor: colors.secondary },
  position: { width: 44, fontSize: 18, fontWeight: "bold", color: colors.primary },
  userArea: { flex: 1 },
  name: { fontSize: 16, fontWeight: "bold", color: colors.text },
  exact: { fontSize: 13, color: colors.muted, marginTop: 3 },
  points: { fontSize: 16, fontWeight: "bold", color: colors.secondary },
});