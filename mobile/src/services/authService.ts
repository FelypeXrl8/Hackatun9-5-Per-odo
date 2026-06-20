import * as SecureStore from "expo-secure-store";
 
export async function getToken(): Promise<string | null> {
  return SecureStore.getItemAsync("token");
}
 
export async function isAutenticado(): Promise<boolean> {
  const token = await getToken();
  return token !== null;
}