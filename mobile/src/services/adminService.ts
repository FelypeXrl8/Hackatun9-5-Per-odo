import { api } from "./api";
import type { Match } from "./matchService";

export type Selection = {
  id: number;
  nome: string;
  codigoFifa: string;
  urlImagem?: string;
  grupo?: string;
};

export type AdminUser = {
  id: number;
  nome: string;
  email: string;
  avatarUrl?: string;
  perfil: string;
  bloqueado: boolean;
  pontuacaoTotal: number;
  placaresExatos: number;
  criadoEm: string;
};

export type CreateMatchRequest = {
  selecaoAId: number;
  selecaoBId: number;
  dataHora: string;
  estadio: string;
  fase: string;
  grupo?: string;
};

export type SelectionRequest = {
  nome: string;
  codigoFifa: string;
  urlImagem?: string;
  grupo?: string;
};

export type ResultRequest = {
  golsA: number;
  golsB: number;
};

export async function getAdminSelections() {
  const response = await api.get<Selection[]>("/api/admin/selecoes");
  return response.data;
}

export async function createAdminSelection(data: SelectionRequest) {
  const response = await api.post<Selection>("/api/admin/selecoes", data);
  return response.data;
}

export async function updateAdminSelection(id: number, data: SelectionRequest) {
  const response = await api.put<Selection>(`/api/admin/selecoes/${id}`, data);
  return response.data;
}

export async function deleteAdminSelection(id: number) {
  await api.delete(`/api/admin/selecoes/${id}`);
}

export async function getAdminMatches() {
  const response = await api.get<Match[]>("/api/admin/partidas");
  return response.data;
}

export async function createAdminMatch(data: CreateMatchRequest) {
  const response = await api.post<Match>("/api/admin/partidas", data);
  return response.data;
}

export async function updateAdminMatch(id: number, data: CreateMatchRequest) {
  const response = await api.put<Match>(`/api/admin/partidas/${id}`, data);
  return response.data;
}

export async function deleteAdminMatch(id: number) {
  await api.delete(`/api/admin/partidas/${id}`);
}

export async function saveAdminResult(id: number, data: ResultRequest) {
  const response = await api.post<Match>(`/api/admin/partidas/${id}/resultado`, data);
  return response.data;
}

export async function clearAdminResult(id: number) {
  const response = await api.delete<Match>(`/api/admin/partidas/${id}/resultado`);
  return response.data;
}

export async function getAdminUsers() {
  const response = await api.get<AdminUser[]>("/api/admin/usuarios");
  return response.data;
}

export async function updateUserBlock(id: number, bloqueado: boolean) {
  const response = await api.patch<AdminUser>(`/api/admin/usuarios/${id}/bloqueio`, { bloqueado });
  return response.data;
}
