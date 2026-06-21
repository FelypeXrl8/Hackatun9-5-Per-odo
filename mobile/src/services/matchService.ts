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

export async function getMatches() {
  const response = await api.get<Match[]>("/api/partidas");
  return response.data;
}

export async function getMatchById(id: string) {
  const response = await api.get<Match>(`/api/partidas/${id}`);
  return response.data;
}