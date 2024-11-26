import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export function setItemAsync(key: string, value: any) {
  if (Platform.OS === "web") {
    // for dev
    return Promise.resolve(localStorage.setItem(key, value));
  } else {
    return SecureStore.setItemAsync(key, value);
  }
}

export function setItem(key: string, value: any) {
  if (Platform.OS === "web") {
    // for dev
    return localStorage.setItem(key, value);
  } else {
    return SecureStore.setItem(key, value);
  }
}

export function getItemAsync(key: string) {
  if (Platform.OS === "web") {
    // for dev
    return Promise.resolve(localStorage.getItem(key));
  } else {
    return SecureStore.getItemAsync(key);
  }
}

export function getItem(key: string) {
  if (Platform.OS === "web") {
    // for dev
    return localStorage.getItem(key);
  } else {
    return SecureStore.getItem(key);
  }
}

export function deleteItemAsync(key: string) {
  if (Platform.OS === "web") {
    // for dev
    return Promise.resolve(localStorage.removeItem(key));
  } else {
    return SecureStore.deleteItemAsync(key);
  }
}

export function deleteItem(key: string) {
  if (Platform.OS === "web") {
    // for dev
    return localStorage.removeItem(key);
  } else {
    return SecureStore.deleteItemAsync(key);
  }
}
