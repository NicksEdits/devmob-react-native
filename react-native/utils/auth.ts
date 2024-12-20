import * as LocalStorage from "@/utils/localStorage";
import { get, post } from "./api";

export const authStatus = {
  LOADING: "loading",
  IDLE: "idle",
  FAILED: "failed",
};

export async function login(username: string, password: string) {
  const { token } = await post("login", { username, password }).catch((err) => {
    if (err.response?.status === 401) {
      throw new Error("Invalid credentials");
    }
  });
  if (!token) {
    throw new Error("Invalid credentials");
  }
  await LocalStorage.setItemAsync("token", token);
  const user = await get("users/me");

  return { token, user };
}

export async function register(username: string, password: string) {
  const { token } = await post("register", { username, password }).catch(
    (err) => {
      if (err.response?.status === 422) {
        throw new Error(err.response.data.message);
      }
    }
  );
  if (!token) {
    throw new Error("Invalid values");
  }
  await LocalStorage.setItemAsync("token", token);
  const user = await get("users/me");

  return { token, user };
}

export function logout() {
  return LocalStorage.deleteItem("token");
}
