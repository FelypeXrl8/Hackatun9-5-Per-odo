import { storage } from "./storage";

export async function getToken(): Promise<string | null> {
  return storage.getItem("token");
}

export async function isAutenticado(): Promise<boolean> {
  const token = await getToken();
  return token !== null;
}