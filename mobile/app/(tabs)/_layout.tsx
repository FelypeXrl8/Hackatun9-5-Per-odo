import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: "#0B5D1E",
        },
        headerTintColor: "#FFFFFF",
        tabBarActiveTintColor: "#16A34A",
        tabBarInactiveTintColor: "#64748B",
        tabBarStyle: {
          height: 62,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen name="home" options={{ title: "Início" }} />
      <Tabs.Screen name="matches" options={{ title: "Partidas" }} />
      <Tabs.Screen name="bets" options={{ title: "Palpites" }} />
      <Tabs.Screen name="ranking" options={{ title: "Ranking" }} />
      <Tabs.Screen name="profile" options={{ title: "Perfil" }} />
    </Tabs>
  );
}
