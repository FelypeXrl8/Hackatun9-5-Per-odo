import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

// Define o formato do usuário que vamos guardar em memória após o login.
type Usuario = {
  id: number;
  nome: string;
  email: string;
};

// Define o que o contexto vai disponibilizar para as telas.
type AuthContextData = {
  usuario: Usuario | null;   // null = não logado
  isLoading: boolean;        // true enquanto verificamos se já há sessão salva
  login: (email: string, senha: string) => Promise<void>;
  register: (nome: string, email: string, senha: string) => Promise<void>;
  logout: () => Promise<void>;
};

// Criação do contexto em si. O valor padrão nunca é usado de verdade,
// pois o Provider abaixo sempre fornece os valores reais.
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// O Provider é o componente que vai envolver o app inteiro (no _layout.tsx).
// Ele mantém o estado do usuário e implementa as funções de auth.
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Ao iniciar o app, verifica se já existe um token e dados de usuário salvos.
  // Se existir, restaura a sessão automaticamente sem pedir login de novo.
  useEffect(() => {
    async function restaurarSessao() {
      try {
        const token = await SecureStore.getItemAsync("token");
        const usuarioSalvo = await SecureStore.getItemAsync("usuario");

        if (token && usuarioSalvo) {
          setUsuario(JSON.parse(usuarioSalvo));
        }
      } catch {
        // Se der erro ao ler o storage, simplesmente não restauramos a sessão.
      } finally {
        setIsLoading(false);
      }
    }

    restaurarSessao();
  }, []);

  // Chama POST /auth/login, salva o token e os dados do usuário no SecureStore,
  // atualiza o estado e navega para a home.
  async function login(email: string, senha: string) {
    const response = await api.post("/auth/login", { email, password: senha });
    const { token, usuario: usuarioRetornado } = response.data;

    await SecureStore.setItemAsync("token", token);
    await SecureStore.setItemAsync("usuario", JSON.stringify(usuarioRetornado));

    setUsuario(usuarioRetornado);
    router.replace("/home");
  }

  // Chama POST /auth/cadastro, e em seguida faz login automaticamente
  // para que o usuário já entre direto na home após se cadastrar.
  async function register(nome: string, email: string, senha: string) {
    await api.post("/auth/cadastro", { nome, email, password: senha });
    await login(email, senha);
  }

  // Apaga tudo do SecureStore, limpa o estado e manda para a tela de login.
  async function logout() {
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("usuario");
    setUsuario(null);
    router.replace("/");
  }

  return (
    <AuthContext.Provider value={{ usuario, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado: em vez de importar useContext + AuthContext em cada tela,
// basta importar useAuth(). Mais limpo e menos repetição.
export function useAuth() {
  return useContext(AuthContext);
}