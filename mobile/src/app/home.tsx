import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.badge}>Copa do Mundo 2026</Text>

      <Text style={styles.title}>Bem-vindo ao Bolão</Text>

      <Text style={styles.description}>
        Visualize as partidas, registre seus palpites e acompanhe sua posição no ranking geral.
      </Text>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Seu resumo</Text>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Pontuação atual</Text>
          <Text style={styles.summaryValue}>25 pts</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Placares exatos</Text>
          <Text style={styles.summaryValue}>1</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Posição no ranking</Text>
          <Text style={styles.summaryValue}>3º</Text>
        </View>
      </View>

      <Link href="/matches" asChild>
        <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
          <Text style={styles.primaryButtonText}>Ver Partidas</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/bets" asChild>
        <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8}>
          <Text style={styles.secondaryButtonText}>Meus Palpites</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/ranking" asChild>
        <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8}>
          <Text style={styles.secondaryButtonText}>Ver Ranking</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/profile" asChild>
        <TouchableOpacity style={styles.outlineButton} activeOpacity={0.8}>
          <Text style={styles.outlineButtonText}>Meu Perfil</Text>
        </TouchableOpacity>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  content: {
    padding: 24,
    justifyContent: "center",
    flexGrow: 1,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#DCFCE7",
    color: "#0B5D1E",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    fontWeight: "bold",
    marginBottom: 18,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#475569",
    lineHeight: 24,
    marginBottom: 24,
  },
  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 22,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 14,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  summaryLabel: {
    color: "#64748B",
    fontSize: 15,
  },
  summaryValue: {
    color: "#16A34A",
    fontSize: 15,
    fontWeight: "bold",
  },
  primaryButton: {
    backgroundColor: "#16A34A",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: "#FACC15",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  secondaryButtonText: {
    color: "#0F172A",
    fontSize: 16,
    fontWeight: "bold",
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: "#16A34A",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
  },
  outlineButtonText: {
    color: "#16A34A",
    fontSize: 16,
    fontWeight: "bold",
  },
});
