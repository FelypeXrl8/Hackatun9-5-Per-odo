import { router } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { storage } from "../services/storage";

type Usuario = {
  id: number;
  nome: string;
  email: string;
  avatarUrl?: string;
  perfil?: string;
  bloqueado?: boolean;
  pontuacaoTotal?: number;
  placaresExatos?: number;
};

type AuthContextData = {
  usuario: Usuario | null;
  isLoading: boolean;
  login: (email: string, senha: string) => Promise<void>;
  register: (nome: string, email: string, senha: string) => Promise<void>;
  logout: () => Promise<void>;
  atualizarUsuario: (usuario: Usuario) => void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function restaurarSessao() {
      try {
        const token = await storage.getItem("token");
        const usuarioSalvo = await storage.getItem("usuario");
        if (token && usuarioSalvo) {
          setUsuario(JSON.parse(usuarioSalvo));
        }
      } finally {
        setIsLoading(false);
      }
    }
    restaurarSessao();
  }, []);

  async function login(email: string, senha: string) {
    const response = await api.post("/api/auth/login", { email, password: senha });
    const { token, usuario: usuarioRetornado } = response.data;
    await storage.setItem("token", token);
    await storage.setItem("usuario", JSON.stringify(usuarioRetornado));
    setUsuario(usuarioRetornado);
    router.replace("/home");
  }

  async function register(nome: string, email: string, senha: string) {
    await api.post("/api/auth/cadastro", { nome, email, password: senha });
    await login(email, senha);
  }

  async function logout() {
    await storage.removeItem("token");
    await storage.removeItem("usuario");
    setUsuario(null);
    router.replace("/");
  }

  function atualizarUsuario(usuarioAtualizado: Usuario) {
    setUsuario(usuarioAtualizado);
    storage.setItem("usuario", JSON.stringify(usuarioAtualizado));
  }

  return (
    <AuthContext.Provider value={{ usuario, isLoading, login, register, logout, atualizarUsuario }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}