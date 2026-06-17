import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.badge}>Copa do Mundo 2026</Text>
      <Text style={styles.title}>Bem-vindo ao Bolão</Text>

      <Text style={styles.description}>
        Aqui você poderá visualizar partidas, registrar palpites e acompanhar sua posição no ranking geral.
      </Text>

      <TouchableOpacity style={styles.primaryButton} onPress={() => router.push("/matches")}>
        <Text style={styles.primaryButtonText}>Ver Partidas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push("/ranking")}>
        <Text style={styles.secondaryButtonText}>Ver Ranking</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={() => router.replace("/")}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 24,
    justifyContent: "center",
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
    marginBottom: 28,
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
  logoutButton: {
    alignItems: "center",
    marginTop: 16,
  },
  logoutText: {
    color: "#DC2626",
    fontWeight: "bold",
  },
});
