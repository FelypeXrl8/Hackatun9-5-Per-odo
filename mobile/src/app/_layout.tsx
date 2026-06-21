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
    const rotaPublica = segments[0] === undefined || segments[0] === "register";
    if (!usuario && !rotaPublica) {
      router.replace("/");
      return;
    }
    if (usuario && rotaPublica) {
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
    <AuthProvider>
      <StatusBar style="light" />
      <RoteamentoProtegido />
    </AuthProvider>
  );
}