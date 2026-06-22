import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

const memory = new Map<string, string>();

export const storage = {
  async getItem(key: string) {
    try {
      if (Platform.OS === "web" && typeof localStorage !== "undefined") {
        return localStorage.getItem(key);
      }
      return await SecureStore.getItemAsync(key);
    } catch {
      return memory.get(key) ?? null;
    }
  },

  async setItem(key: string, value: string) {
    try {
      if (Platform.OS === "web" && typeof localStorage !== "undefined") {
        localStorage.setItem(key, value);
        return;
      }
      await SecureStore.setItemAsync(key, value);
    } catch {
      memory.set(key, value);
    }
  },

  async removeItem(key: string) {
    try {
      if (Platform.OS === "web" && typeof localStorage !== "undefined") {
        localStorage.removeItem(key);
        return;
      }
      await SecureStore.deleteItemAsync(key);
    } catch {
      memory.delete(key);
    }
  },
};