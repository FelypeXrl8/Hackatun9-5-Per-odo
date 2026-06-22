import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";
import { useAuth } from "../contexts/authContext";

export default function Profile() {
  const { usuario, logout } = useAuth();
  const inicial = usuario?.nome?.charAt(0).toUpperCase() ?? "?";

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Meu Perfil</Text>
      <Text style={styles.subtitle}>Informações do usuário autenticado no aplicativo.</Text>
      <View style={styles.avatar}><Text style={styles.avatarText}>{inicial}</Text></View>
      <View style={styles.card}>
        <Text style={styles.label}>Nome</Text>
        <Text style={styles.value}>{usuario?.nome ?? "—"}</Text>
        <Text style={styles.label}>E-mail</Text>
        <Text style={styles.value}>{usuario?.email ?? "—"}</Text>
        <Text style={styles.label}>Pontuação</Text>
        <Text style={styles.value}>{usuario?.pontuacaoTotal ?? 0} pontos</Text>
      </View>
      <Link href="/bets" asChild><TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8}><Text style={styles.secondaryButtonText}>Ver Meus Palpites</Text></TouchableOpacity></Link>
      <Link href="/ranking" asChild><TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8}><Text style={styles.secondaryButtonText}>Ver Ranking</Text></TouchableOpacity></Link>
      <TouchableOpacity style={styles.logoutButton} activeOpacity={0.8} onPress={logout}><Text style={styles.logoutButtonText}>Sair da Conta</Text></TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20 },
  title: { fontSize: 30, fontWeight: "bold", color: colors.text, marginBottom: 6 },
  subtitle: { fontSize: 15, color: colors.muted, marginBottom: 22 },
  avatar: { width: 92, height: 92, borderRadius: 46, backgroundColor: colors.primary, alignSelf: "center", alignItems: "center", justifyContent: "center", marginBottom: 20 },
  avatarText: { color: colors.accent, fontSize: 38, fontWeight: "bold" },
  card: { backgroundColor: colors.white, borderRadius: 18, padding: 18, borderWidth: 1, borderColor: colors.border, marginBottom: 20 },
  label: { fontSize: 13, color: colors.muted, marginTop: 10 },
  value: { fontSize: 16, color: colors.text, fontWeight: "bold", marginTop: 3 },
  secondaryButton: { backgroundColor: colors.accent, borderRadius: 14, padding: 16, alignItems: "center", marginBottom: 12 },
  secondaryButtonText: { color: colors.dark, fontSize: 16, fontWeight: "bold" },
  logoutButton: { backgroundColor: colors.danger, borderRadius: 14, padding: 16, alignItems: "center", marginTop: 4 },
  logoutButtonText: { color: colors.white, fontSize: 16, fontWeight: "bold" },
});