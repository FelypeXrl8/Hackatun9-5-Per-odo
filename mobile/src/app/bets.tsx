import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../constants/colors";
import { getMyBets, type Bet } from "../services/betService";

export default function Bets() {
  const [bets, setBets] = useState<Bet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    try {
      setLoading(true);
      setBets(await getMyBets());
    } catch {
      Alert.alert("Erro", "Não foi possível carregar seus palpites.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Meus Palpites</Text>
      <Text style={styles.subtitle}>
        Acompanhe seus palpites e a pontuação após o resultado das partidas.
      </Text>

      {bets.length === 0 && (
        <Text style={styles.empty}>Você ainda não registrou nenhum palpite.</Text>
      )}

      {bets.map((bet) => (
        <View key={bet.id} style={styles.card}>
          <Text style={styles.match}>
            {bet.partida.selecaoA.nome} x {bet.partida.selecaoB.nome}
          </Text>

          <Text style={styles.info}>
            Palpite: {bet.golsA} x {bet.golsB}
          </Text>

          <Text style={styles.info}>
            Resultado: {bet.partida.golsA ?? "-"} x {bet.partida.golsB ?? "-"}
          </Text>

          <Text style={styles.points}>Pontuação: {bet.pontos}</Text>
          <Text style={styles.criteria}>{bet.criterio}</Text>

          {bet.partida.abertaParaPalpite && (
            <TouchableOpacity
              style={styles.editButton}
              activeOpacity={0.8}
              onPress={() =>
                router.push({
                  pathname: "/match/[id]",
                  params: {
                    id: String(bet.partida.id),
                    goalsA: String(bet.golsA),
                    goalsB: String(bet.golsB),
                  },
                })
              }
            >
              <Text style={styles.editButtonText}>Editar palpite</Text>
            </TouchableOpacity>
          )}

          {!bet.partida.abertaParaPalpite && (
            <Text style={styles.blockedText}>
              Edição bloqueada para esta partida.
            </Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: colors.muted,
    marginBottom: 20,
  },
  empty: {
    color: colors.muted,
    backgroundColor: colors.white,
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  match: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 8,
  },
  info: {
    color: colors.muted,
    marginBottom: 4,
  },
  points: {
    color: colors.secondary,
    fontWeight: "bold",
    marginTop: 8,
  },
  criteria: {
    color: colors.muted,
    marginTop: 6,
    fontSize: 13,
  },
  editButton: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 14,
  },
  editButtonText: {
    color: colors.white,
    fontWeight: "bold",
  },
  blockedText: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 12,
    fontStyle: "italic",
  },
});