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
import { getMatches, type Match } from "../services/matchService";

function formatDate(value: string) {
  const date = new Date(value);

  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const fases = [
  { label: "Todas", value: "" },
  { label: "Fase de grupos", value: "Fase de grupos" },
  { label: "Segunda Rodada", value: "Segunda Rodada" },
  { label: "Oitavas", value: "Oitavas de final" },
  { label: "Quartas", value: "Quartas de final" },
  { label: "Semi", value: "Semi-finais" },
  { label: "3º lugar", value: "Disputa Terceiro Lugar" },
  { label: "Final", value: "Final" },
];

const statusOptions = [
  { label: "Todos", value: "" },
  { label: "Agendada", value: "AGENDADA" },
  { label: "Em andamento", value: "EM_ANDAMENTO" },
  { label: "Encerrada", value: "ENCERRADA" },
];

export default function Matches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  const [showFilters, setShowFilters] = useState(false);
  const [fase, setFase] = useState("");
  const [status, setStatus] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    try {
      setLoading(true);

      const filtros = {
        fase: fase || undefined,
        status: status || undefined,
        dataInicio: dataInicio || undefined,
        dataFim: dataFim || undefined,
      };

      const data = await getMatches(filtros);
      setMatches(data);
    } catch {
      Alert.alert(
        "Erro",
        "Não foi possível carregar as partidas. Confira se o backend está rodando."
      );
    } finally {
      setLoading(false);
    }
  }

  async function limparFiltros() {
    try {
      setLoading(true);

      setFase("");
      setStatus("");
      setDataInicio("");
      setDataFim("");

      const data = await getMatches();
      setMatches(data);
    } catch {
      Alert.alert("Erro", "Não foi possível limpar os filtros.");
    } finally {
      setLoading(false);
    }
  }

  function filtrarHoje() {
    const hoje = new Date().toISOString().split("T")[0];

    setDataInicio(`${hoje}T00:00:00`);
    setDataFim(`${hoje}T23:59:59`);
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
      <Text style={styles.title}>Partidas</Text>
      <Text style={styles.subtitle}>
        Escolha uma partida para registrar seu palpite.
      </Text>

      <TouchableOpacity
        style={styles.filterToggle}
        onPress={() => setShowFilters(!showFilters)}
      >
        <Text style={styles.filterToggleText}>
          {showFilters ? "Ocultar filtros ▲" : "Filtrar partidas ▼"}
        </Text>
      </TouchableOpacity>

      {showFilters && (
        <View style={styles.filters}>
          <Text style={styles.filterTitle}>Fase</Text>

          <View style={styles.filterRow}>
            {fases.map((item) => (
              <TouchableOpacity
                key={item.value || "todas"}
                style={[
                  styles.filterButton,
                  fase === item.value && styles.filterButtonActive,
                ]}
                onPress={() => setFase(item.value)}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    fase === item.value && styles.filterButtonTextActive,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.filterTitle}>Status</Text>

          <View style={styles.filterRow}>
            {statusOptions.map((item) => (
              <TouchableOpacity
                key={item.value || "todos"}
                style={[
                  styles.filterButton,
                  status === item.value && styles.filterButtonActive,
                ]}
                onPress={() => setStatus(item.value)}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    status === item.value && styles.filterButtonTextActive,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.filterTitle}>Data</Text>

          <View style={styles.filterRow}>
            <TouchableOpacity
              style={[
                styles.filterButton,
                dataInicio && dataFim && styles.filterButtonActive,
              ]}
              onPress={filtrarHoje}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  dataInicio && dataFim && styles.filterButtonTextActive,
                ]}
              >
                Hoje
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => {
                setDataInicio("");
                setDataFim("");
              }}
            >
              <Text style={styles.filterButtonText}>Sem data</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.applyButton} onPress={carregar}>
              <Text style={styles.applyButtonText}>Aplicar filtros</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.clearButton} onPress={limparFiltros}>
              <Text style={styles.clearButtonText}>Limpar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {matches.length === 0 && (
        <Text style={styles.emptyText}>
          Nenhuma partida encontrada com os filtros selecionados.
        </Text>
      )}

      {matches.map((match) => (
        <TouchableOpacity
          key={match.id}
          style={styles.card}
          activeOpacity={0.8}
          onPress={() =>
            router.push({
              pathname: "/match/[id]",
              params: { id: String(match.id) },
            })
          }
        >
          <View style={styles.teamsArea}>
            <View style={styles.teamBox}>
              <Text style={styles.code}>{match.selecaoA.codigoFifa}</Text>
              <Text style={styles.team}>{match.selecaoA.nome}</Text>
            </View>

            <Text style={styles.vs}>x</Text>

            <View style={styles.teamBox}>
              <Text style={styles.code}>{match.selecaoB.codigoFifa}</Text>
              <Text style={styles.team}>{match.selecaoB.nome}</Text>
            </View>
          </View>

          <Text style={styles.info}>{match.fase}</Text>
          <Text style={styles.info}>{formatDate(match.dataHora)}</Text>
          <Text style={styles.info}>{match.estadio}</Text>

          {match.golsA !== undefined && match.golsB !== undefined && (
            <Text style={styles.result}>
              Resultado: {match.golsA} x {match.golsB}
            </Text>
          )}

          <View
            style={[
              styles.statusBadge,
              !match.abertaParaPalpite && styles.statusClosed,
            ]}
          >
            <Text style={styles.statusText}>
              {match.abertaParaPalpite ? "Aberta para palpites" : match.status}
            </Text>
          </View>
        </TouchableOpacity>
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
  filterToggle: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  filterToggleText: {
    color: colors.primary,
    fontWeight: "bold",
    textAlign: "center",
  },
  filters: {
    marginBottom: 18,
  },
  filterTitle: {
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 8,
    marginTop: 10,
  },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  filterButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterButtonText: {
    color: colors.text,
    fontWeight: "600",
  },
  filterButtonTextActive: {
    color: colors.white,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  applyButton: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  applyButtonText: {
    color: colors.white,
    fontWeight: "bold",
  },
  clearButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  clearButtonText: {
    color: colors.text,
    fontWeight: "bold",
  },
  emptyText: {
    color: colors.muted,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  teamsArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  teamBox: {
    flex: 1,
    alignItems: "center",
  },
  code: {
    backgroundColor: "#e8f7f2",
    color: colors.primary,
    fontWeight: "bold",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 8,
  },
  team: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
    textAlign: "center",
  },
  vs: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.muted,
    marginHorizontal: 12,
  },
  info: {
    color: colors.muted,
    marginBottom: 4,
  },
  result: {
    color: colors.text,
    fontWeight: "bold",
    marginTop: 6,
  },
  statusBadge: {
    backgroundColor: colors.accent,
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    marginTop: 10,
  },
  statusClosed: {
    backgroundColor: colors.border,
  },
  statusText: {
    color: colors.dark,
    fontWeight: "bold",
    fontSize: 13,
  },
});