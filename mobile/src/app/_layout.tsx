import { Stack, useSegments, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "../contexts/authContext";

// Componente separado para a lógica de proteção de rotas.
// Precisa ficar DENTRO do AuthProvider para conseguir acessar o useAuth().
function RoteamentoProtegido() {
  const { usuario, isLoading } = useAuth();

  // useSegments retorna o caminho atual da navegação, ex: ["home"] ou ["match", "1"].
  // Usamos isso para saber se o usuário está em uma rota pública ou protegida.
  const segments = useSegments();

  useEffect(() => {
    if (isLoading) return; // Aguarda a verificação de sessão terminar antes de redirecionar.

    const rotaPublica = segments[0] === undefined || segments[0] === "register";

    if (!usuario && !rotaPublica) {
      // Usuário não logado tentando acessar rota protegida → vai para login.
      router.replace("/");
    } else if (usuario && rotaPublica) {
      // Usuário já logado tentando acessar login/cadastro → vai para home.
      router.replace("/home");
    }
  }, [usuario, isLoading, segments]);

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#0B5D1E" },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ title: "Cadastro" }} />
      <Stack.Screen name="home" options={{ title: "Início" }} />
      <Stack.Screen name="matches" options={{ title: "Partidas" }} />
      <Stack.Screen name="match/[id]" options={{ title: "Registrar Palpite" }} />
      <Stack.Screen name="bets" options={{ title: "Meus Palpites" }} />
      <Stack.Screen name="ranking" options={{ title: "Ranking" }} />
      <Stack.Screen name="profile" options={{ title: "Perfil" }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    // AuthProvider envolve tudo: qualquer tela dentro do app pode usar useAuth()
    <AuthProvider>
      <StatusBar style="light" />
      <RoteamentoProtegido />
    </AuthProvider>
  );
}