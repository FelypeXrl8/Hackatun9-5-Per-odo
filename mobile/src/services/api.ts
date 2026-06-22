import axios from "axios";
import { Platform } from "react-native";
import Constants from "expo-constants";
import { storage } from "./storage";

function getBaseURL() {
  const envUrl = process.env.EXPO_PUBLIC_API_URL;
  if (envUrl) {
    return envUrl;
  }
  if (Platform.OS === "android") {
    return "http://10.0.2.2:8080";
  }
  if (Platform.OS === "web") {
    return "http://localhost:8080";
  }
  const hostUri = Constants.expoConfig?.hostUri ?? "";
  const host = hostUri.split(":")[0];
  return host ? `http://${host}:8080` : "http://localhost:8080";
}

export const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000,
});

api.interceptors.request.use(async (config) => {
  const token = await storage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});