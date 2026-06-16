import { StyleSheet, Text, View } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Bolão Copa 2026</Text>
      <Text style={styles.text}>
        Acompanhe as próximas partidas, registre seus palpites e suba no ranking geral.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: "#475569",
    lineHeight: 24,
  },
});
