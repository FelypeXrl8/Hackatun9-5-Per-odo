import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "../../constants/colors";
import { saveBet } from "../../services/betService";
import { getMatchById, type Match } from "../../services/matchService";

function formatDate(value: string) {
  const date = new Date(value);
  return date.toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function MatchDetails() {
  const { id } = useLocalSearchParams();
  const [match, setMatch] = useState<Match | null>(null);
  const [goalsA, setGoalsA] = useState("");
  const [goalsB, setGoalsB] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    carregar();
  }, [id]);

  async function carregar() {
    try {
      setLoading(true);
      setMatch(await getMatchById(String(id)));
    } catch {
      Alert.alert("Erro", "Não foi possível carregar a partida.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveBet() {
    if (!match) {
      return;
    }
    if (goalsA === "" || goalsB === "") {
      Alert.alert("Atenção", "Informe os gols das duas seleções.");
      return;
    }
    try {
      setSaving(true);
      await saveBet({ matchId: String(match.id), goalsA, goalsB });
      Alert.alert("Palpite salvo", `Seu palpite para ${match.selecaoA.nome} x ${match.selecaoB.nome} foi ${goalsA} x ${goalsB}.`);
      router.push("/bets");
    } catch (error: any) {
      const mensagem = error?.response?.data?.message || "Não foi possível salvar o palpite.";
      Alert.alert("Erro", mensagem);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <View style={styles.loading}><ActivityIndicator color={colors.primary} size="large" /></View>;
  }

  if (!match) {
    return <View style={styles.container}><Text style={styles.title}>Partida não encontrada</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Palpite</Text>
      <Text style={styles.subtitle}>Informe o placar antes do início da partida.</Text>

      <View style={styles.card}>
        <View style={styles.teamsArea}>
          <View style={styles.teamBox}><Text style={styles.code}>{match.selecaoA.codigoFifa}</Text><Text style={styles.team}>{match.selecaoA.nome}</Text></View>
          <Text style={styles.vs}>x</Text>
          <View style={styles.teamBox}><Text style={styles.code}>{match.selecaoB.codigoFifa}</Text><Text style={styles.team}>{match.selecaoB.nome}</Text></View>
        </View>
        <Text style={styles.info}>Data: {formatDate(match.dataHora)}</Text>
        <Text style={styles.info}>Estádio: {match.estadio}</Text>
        <View style={styles.scoreArea}>
          <TextInput style={styles.scoreInput} keyboardType="numeric" value={goalsA} onChangeText={setGoalsA} maxLength={2} placeholder="0" placeholderTextColor="#94a3b8" />
          <Text style={styles.scoreVs}>x</Text>
          <TextInput style={styles.scoreInput} keyboardType="numeric" value={goalsB} onChangeText={setGoalsB} maxLength={2} placeholder="0" placeholderTextColor="#94a3b8" />
        </View>
        <TouchableOpacity style={[styles.button, saving && styles.buttonDisabled]} onPress={handleSaveBet} activeOpacity={0.8} disabled={saving || !match.abertaParaPalpite}>
          {saving ? <ActivityIndicator color={colors.white} /> : <Text style={styles.buttonText}>{match.abertaParaPalpite ? "Salvar Palpite" : "Palpite bloqueado"}</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.background },
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  title: { fontSize: 30, fontWeight: "bold", color: colors.text, marginBottom: 6 },
  subtitle: { fontSize: 15, color: colors.muted, marginBottom: 20 },
  card: { backgroundColor: colors.white, borderRadius: 20, padding: 20, borderWidth: 1, borderColor: colors.border },
  teamsArea: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 18 },
  teamBox: { flex: 1, alignItems: "center" },
  code: { backgroundColor: "#e8f7f2", color: colors.primary, fontWeight: "bold", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, marginBottom: 8 },
  team: { fontSize: 17, fontWeight: "bold", color: colors.text, textAlign: "center" },
  vs: { fontSize: 22, fontWeight: "bold", color: colors.muted, marginHorizontal: 12 },
  info: { color: colors.muted, textAlign: "center", marginBottom: 4 },
  scoreArea: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginVertical: 28 },
  scoreInput: { width: 76, height: 76, borderRadius: 18, backgroundColor: "#f1f5f9", borderWidth: 1, borderColor: "#cbd5e1", textAlign: "center", fontSize: 30, fontWeight: "bold", color: colors.text },
  scoreVs: { fontSize: 30, fontWeight: "bold", color: colors.text, marginHorizontal: 18 },
  button: { backgroundColor: colors.secondary, borderRadius: 14, padding: 16, alignItems: "center" },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: colors.white, fontSize: 16, fontWeight: "bold" },
});