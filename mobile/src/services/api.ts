import axios from "axios";
import * as SecureStore from "expo-secure-store";

// "localhost" só funciona no emulador.
export const api = axios.create({
  baseURL: "http://10.0.2.2:8080", // 10.0.2.2 é o localhost do emulador Android
  timeout: 10000,
});

// Interceptor de requisição:
// Antes de cada chamada sair do app, buscamos o token salvo no SecureStore
// e o adicionamos ao cabeçalho Authorization no formato que o backend espera (Bearer).
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});