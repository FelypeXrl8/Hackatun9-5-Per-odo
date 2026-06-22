import { api } from "./api";

export type Match = {
  id: number;
  selecaoA: {
    id: number;
    nome: string;
    codigoFifa: string;
    urlImagem?: string;
    grupo?: string;
  };
  selecaoB: {
    id: number;
    nome: string;
    codigoFifa: string;
    urlImagem?: string;
    grupo?: string;
  };
  dataHora: string;
  estadio: string;
  fase: string;
  grupo?: string;
  status: string;
  golsA?: number;
  golsB?: number;
  abertaParaPalpite: boolean;
};

export type MatchFilters = {
  fase?: string;
  status?: string;
  dataInicio?: string;
  dataFim?: string;
};

export async function getMatches(filters?: MatchFilters) {
  const response = await api.get<Match[]>("/api/partidas", {
    params: filters,
  });

  return response.data;
}

export async function getMatchById(id: string) {
  const response = await api.get<Match>(`/api/partidas/${id}`);
  return response.data;
}