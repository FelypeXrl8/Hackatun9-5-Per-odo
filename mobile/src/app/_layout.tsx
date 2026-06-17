import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#0B5D1E",
          },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: {
            fontWeight: "bold",
          },
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
    </>
  );
}
