import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Meu Perfil</Text>
      <Text style={styles.subtitle}>
        Informações do usuário autenticado no aplicativo.
      </Text>

      <View style={styles.avatar}>
        <Text style={styles.avatarText}>U</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Nome</Text>
        <Text style={styles.value}>Usuário Teste</Text>

        <Text style={styles.label}>E-mail</Text>
        <Text style={styles.value}>usuario@email.com</Text>

        <Text style={styles.label}>Pontuação total</Text>
        <Text style={styles.points}>25 pontos</Text>

        <Text style={styles.label}>Placares exatos</Text>
        <Text style={styles.value}>1</Text>
      </View>

      <Link href="/bets" asChild>
        <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8}>
          <Text style={styles.secondaryButtonText}>Ver Meus Palpites</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/ranking" asChild>
        <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8}>
          <Text style={styles.secondaryButtonText}>Ver Ranking</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/" asChild>
        <TouchableOpacity style={styles.logoutButton} activeOpacity={0.8}>
          <Text style={styles.logoutButtonText}>Sair da Conta</Text>
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
    marginBottom: 22,
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: "#0B5D1E",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  avatarText: {
    color: "#FACC15",
    fontSize: 38,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: "#0F172A",
    fontWeight: "bold",
    marginTop: 3,
  },
  points: {
    fontSize: 18,
    color: "#16A34A",
    fontWeight: "bold",
    marginTop: 3,
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
    backgroundColor: "#DC2626",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    marginTop: 4,
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
