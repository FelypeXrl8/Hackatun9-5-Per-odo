import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";
import { useAuth } from "../contexts/authContext";
import { createAdminMatch, getAdminSelections, type Selection } from "../services/adminService";

const fases = [
  "Fase de grupos",
  "Segunda Rodada",
  "Oitavas de final",
  "Quartas de final",
  "Semi-finais",
  "Disputa Terceiro Lugar",
  "Final",
];

export default function AdminMatches() {
  const { usuario } = useAuth();
  const [selecoes, setSelecoes] = useState<Selection[]>([]);
  const [selecaoAId, setSelecaoAId] = useState<number | null>(null);
  const [selecaoBId, setSelecaoBId] = useState<number | null>(null);
  const [dataHora, setDataHora] = useState("");
  const [estadio, setEstadio] = useState("");
  const [fase, setFase] = useState("Fase de grupos");
  const [grupo, setGrupo] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (usuario?.perfil !== "ADMIN") {
      Alert.alert("Acesso negado", "Essa tela é exclusiva para administradores.");
      router.replace("/home");
      return;
    }

    carregarSelecoes();
  }, [usuario]);

  async function carregarSelecoes() {
    try {
      setLoading(true);
      const data = await getAdminSelections();
      setSelecoes(data);
    } catch {
      Alert.alert("Erro", "Não foi possível carregar as seleções.");
    } finally {
      setLoading(false);
    }
  }

  function selecionarA(id: number) {
    setSelecaoAId(id);

    if (selecaoBId === id) {
      setSelecaoBId(null);
    }
  }

  function selecionarB(id: number) {
    setSelecaoBId(id);

    if (selecaoAId === id) {
      setSelecaoAId(null);
    }
  }

  function validar() {
    if (!selecaoAId || !selecaoBId) {
      Alert.alert("Atenção", "Selecione as duas seleções da partida.");
      return false;
    }

    if (selecaoAId === selecaoBId) {
      Alert.alert("Atenção", "A partida precisa ter duas seleções diferentes.");
      return false;
    }

    if (!dataHora.trim()) {
      Alert.alert("Atenção", "Informe a data e hora da partida.");
      return false;
    }

    if (!estadio.trim()) {
      Alert.alert("Atenção", "Informe o estádio da partida.");
      return false;
    }

    if (!fase.trim()) {
      Alert.alert("Atenção", "Informe a fase da partida.");
      return false;
    }

    return true;
  }

  async function salvar() {
    if (!validar()) {
      return;
    }

    try {
      setSaving(true);

      await createAdminMatch({
        selecaoAId: Number(selecaoAId),
        selecaoBId: Number(selecaoBId),
        dataHora: dataHora.trim(),
        estadio: estadio.trim(),
        fase: fase.trim(),
        grupo: grupo.trim() || undefined,
      });

      Alert.alert("Partida cadastrada", "A partida foi criada com sucesso.");
      setSelecaoAId(null);
      setSelecaoBId(null);
      setDataHora("");
      setEstadio("");
      setFase("Fase de grupos");
      setGrupo("");
    } catch (error: any) {
      const message = error?.response?.data?.message ?? "Não foi possível cadastrar a partida.";
      Alert.alert("Erro", message);
    } finally {
      setSaving(false);
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
      <Text style={styles.title}>Cadastrar Partida</Text>
      <Text style={styles.subtitle}>Área do administrador para criar partidas do bolão.</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Seleção A</Text>

        <View style={styles.selectionList}>
          {selecoes.map((selecao) => (
            <TouchableOpacity
              key={`a-${selecao.id}`}
              style={[styles.selectionButton, selecaoAId === selecao.id && styles.selectionButtonActive]}
              activeOpacity={0.8}
              onPress={() => selecionarA(selecao.id)}
            >
              <Text style={[styles.selectionCode, selecaoAId === selecao.id && styles.selectionTextActive]}>{selecao.codigoFifa}</Text>
              <Text style={[styles.selectionName, selecaoAId === selecao.id && styles.selectionTextActive]}>{selecao.nome}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Seleção B</Text>

        <View style={styles.selectionList}>
          {selecoes.map((selecao) => (
            <TouchableOpacity
              key={`b-${selecao.id}`}
              style={[styles.selectionButton, selecaoBId === selecao.id && styles.selectionButtonActive]}
              activeOpacity={0.8}
              onPress={() => selecionarB(selecao.id)}
            >
              <Text style={[styles.selectionCode, selecaoBId === selecao.id && styles.selectionTextActive]}>{selecao.codigoFifa}</Text>
              <Text style={[styles.selectionName, selecaoBId === selecao.id && styles.selectionTextActive]}>{selecao.nome}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Data e hora</Text>
        <TextInput
          style={styles.input}
          placeholder="2026-06-25T16:00:00"
          value={dataHora}
          onChangeText={setDataHora}
          autoCapitalize="none"
        />

        <Text style={styles.helper}>Use o formato: ano-mês-dia T hora:minuto:segundo</Text>

        <Text style={styles.label}>Estádio</Text>
        <TextInput
          style={styles.input}
          placeholder="Estádio Nacional"
          value={estadio}
          onChangeText={setEstadio}
        />

        <Text style={styles.label}>Fase</Text>

        <View style={styles.phaseList}>
          {fases.map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.phaseButton, fase === item && styles.phaseButtonActive]}
              activeOpacity={0.8}
              onPress={() => setFase(item)}
            >
              <Text style={[styles.phaseText, fase === item && styles.phaseTextActive]}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Grupo</Text>
        <TextInput
          style={styles.input}
          placeholder="A"
          value={grupo}
          onChangeText={setGrupo}
          autoCapitalize="characters"
        />

        <TouchableOpacity style={[styles.saveButton, saving && styles.disabledButton]} activeOpacity={0.8} onPress={salvar} disabled={saving}>
          <Text style={styles.saveButtonText}>{saving ? "Salvando..." : "Cadastrar Partida"}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.background },
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20 },
  title: { fontSize: 30, fontWeight: "bold", color: colors.text, marginBottom: 6 },
  subtitle: { fontSize: 15, color: colors.muted, marginBottom: 20 },
  card: { backgroundColor: colors.white, borderRadius: 18, padding: 18, borderWidth: 1, borderColor: colors.border },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: colors.text, marginBottom: 12, marginTop: 8 },
  selectionList: { marginBottom: 16 },
  selectionButton: { borderWidth: 1, borderColor: colors.border, borderRadius: 14, padding: 14, marginBottom: 10, backgroundColor: colors.background },
  selectionButtonActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  selectionCode: { fontSize: 13, color: colors.primary, fontWeight: "bold", marginBottom: 4 },
  selectionName: { fontSize: 15, color: colors.text, fontWeight: "bold" },
  selectionTextActive: { color: colors.white },
  label: { fontSize: 14, color: colors.text, fontWeight: "bold", marginBottom: 8, marginTop: 12 },
  helper: { fontSize: 12, color: colors.muted, marginTop: -6, marginBottom: 6 },
  input: { backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border, borderRadius: 14, padding: 14, fontSize: 15, color: colors.text },
  phaseList: { marginBottom: 4 },
  phaseButton: { borderWidth: 1, borderColor: colors.border, borderRadius: 999, paddingVertical: 10, paddingHorizontal: 14, marginBottom: 8, alignSelf: "flex-start", backgroundColor: colors.background },
  phaseButtonActive: { backgroundColor: colors.accent, borderColor: colors.accent },
  phaseText: { color: colors.text, fontWeight: "bold" },
  phaseTextActive: { color: colors.dark },
  saveButton: { backgroundColor: colors.primary, borderRadius: 14, padding: 16, alignItems: "center", marginTop: 20 },
  saveButtonText: { color: colors.white, fontSize: 16, fontWeight: "bold" },
  disabledButton: { opacity: 0.7 },
});