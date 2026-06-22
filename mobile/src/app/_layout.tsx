import { Stack, router, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { colors } from "../constants/colors";
import { AuthProvider, useAuth } from "../contexts/authContext";

function RoteamentoProtegido() {
  const { usuario, isLoading } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    
    const rotasPublicas = ["register", "forgot-password", "ranking", "redefinir-senha"];

   
    const rotaPublica = segments[0] === undefined || rotasPublicas.includes(segments[0]);

    if (!usuario && !rotaPublica) {
      router.replace("/");
      return;
    }

    // 3. AJUSTADO: Se o usuário estiver logado, ele não pode acessar Login, Cadastro, Esqueci Senha ou Redefinir Senha
    const noFluxoAutenticacao = 
      segments[0] === undefined || 
      segments[0] === "register" || 
      segments[0] === "forgot-password" || 
      segments[0] === "redefinir-senha";

    if (usuario && noFluxoAutenticacao) {
      router.replace("/home");
    }
  }, [usuario, isLoading, segments]);

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.white,
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ title: "Cadastro" }} />
      <Stack.Screen name="forgot-password" options={{ title: "Recuperar Senha" }} /> 
      
      {/* 4. ADICIONADO: Declaração da tela de redefinir no navegador Stack */}
      <Stack.Screen name="redefinir-senha" options={{ title: "Redefinir Senha" }} /> 
      
      <Stack.Screen name="home" options={{ title: "Início" }} />
      <Stack.Screen name="matches" options={{ title: "Partidas" }} />
      <Stack.Screen name="admin-matches" options={{ title: "Admin Partidas" }} />
      <Stack.Screen name="match/[id]" options={{ title: "Registrar Palpite" }} />
      <Stack.Screen name="bets" options={{ title: "Meus Palpites" }} />
      <Stack.Screen name="ranking" options={{ title: "Ranking" }} />
      <Stack.Screen name="profile" options={{ title: "Perfil" }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="light" />
      <RoteamentoProtegido />
    </AuthProvider>
  );
}
