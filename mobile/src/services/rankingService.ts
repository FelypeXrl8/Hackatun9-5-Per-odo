import { api } from "./api";

export type RankingItem = {
  position: number;
  usuarioId: number;
  nome: string;
  points: number;
  exactScores: number;
};

export async function getRanking() {
  const response = await api.get<RankingItem[]>("/api/ranking");
  return response.data;
}