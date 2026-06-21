import { api } from "./api";
import type { Match } from "./matchService";

export type Bet = {
  id: number;
  partida: Match;
  golsA: number;
  golsB: number;
  pontos: number;
  criterio: string;
};

type SaveBetData = {
  matchId: string;
  goalsA: string;
  goalsB: string;
};

export async function getMyBets() {
  const response = await api.get<Bet[]>("/api/palpites/me");
  return response.data;
}

export async function saveBet(data: SaveBetData) {
  const response = await api.post<Bet>("/api/palpites", {
    partidaId: Number(data.matchId),
    golsA: Number(data.goalsA),
    golsB: Number(data.goalsB),
  });
  return response.data;
}