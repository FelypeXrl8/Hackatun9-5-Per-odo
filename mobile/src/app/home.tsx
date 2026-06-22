import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";
import { useAuth } from "../contexts/authContext";

export default function Home() {
  const { usuario } = useAuth();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.badge}>Copa do Mundo 2026</Text>
      <Text style={styles.title}>Bem-vindo, {usuario?.nome?.split(" ")[0] ?? "jogador"}</Text>
      <Text style={styles.description}>Visualize as partidas, registre seus palpites e acompanhe sua posição no ranking geral.</Text>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Seu resumo</Text>
        <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Pontuação atual</Text><Text style={styles.summaryValue}>{usuario?.pontuacaoTotal ?? 0} pts</Text></View>
        <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Placares exatos</Text><Text style={styles.summaryValue}>{usuario?.placaresExatos ?? 0}</Text></View>
      </View>

      <Link href="/matches" asChild><TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}><Text style={styles.primaryButtonText}>Ver Partidas</Text></TouchableOpacity></Link>
      <Link href="/bets" asChild><TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8}><Text style={styles.secondaryButtonText}>Meus Palpites</Text></TouchableOpacity></Link>
      <Link href="/ranking" asChild><TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8}><Text style={styles.secondaryButtonText}>Ver Ranking</Text></TouchableOpacity></Link>

      {usuario?.perfil === "ADMIN" && (
        <Link href="/admin-matches" asChild>
          <TouchableOpacity style={styles.adminButton} activeOpacity={0.8}>
            <Text style={styles.adminButtonText}>Cadastrar Partida</Text>
          </TouchableOpacity>
        </Link>
      )}

      <Link href="/profile" asChild><TouchableOpacity style={styles.outlineButton} activeOpacity={0.8}><Text style={styles.outlineButtonText}>Meu Perfil</Text></TouchableOpacity></Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 24, justifyContent: "center", flexGrow: 1 },
  badge: { alignSelf: "flex-start", backgroundColor: "#e8f7f2", color: colors.primary, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999, fontWeight: "bold", marginBottom: 18 },
  title: { fontSize: 34, fontWeight: "bold", color: colors.text, marginBottom: 12 },
  description: { fontSize: 16, color: colors.muted, lineHeight: 24, marginBottom: 24 },
  summaryCard: { backgroundColor: colors.white, borderRadius: 18, padding: 18, borderWidth: 1, borderColor: colors.border, marginBottom: 22 },
  summaryTitle: { fontSize: 18, fontWeight: "bold", color: colors.text, marginBottom: 14 },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  summaryLabel: { color: colors.muted, fontSize: 15 },
  summaryValue: { color: colors.secondary, fontSize: 15, fontWeight: "bold" },
  primaryButton: { backgroundColor: colors.primary, borderRadius: 14, padding: 16, alignItems: "center", marginBottom: 12 },
  primaryButtonText: { color: colors.white, fontSize: 16, fontWeight: "bold" },
  secondaryButton: { backgroundColor: colors.accent, borderRadius: 14, padding: 16, alignItems: "center", marginBottom: 12 },
  secondaryButtonText: { color: colors.dark, fontSize: 16, fontWeight: "bold" },
  adminButton: { backgroundColor: colors.dark, borderRadius: 14, padding: 16, alignItems: "center", marginBottom: 12 },
  adminButtonText: { color: colors.white, fontSize: 16, fontWeight: "bold" },
  outlineButton: { borderWidth: 1, borderColor: colors.secondary, borderRadius: 14, padding: 16, alignItems: "center" },
  outlineButtonText: { color: colors.secondary, fontSize: 16, fontWeight: "bold" },
});