import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export function setItemAsync(key, value) {
  if (Platform.OS === "web") {
    return Promise.resolve(localStorage.setItem(key, value));
  } else {
    return SecureStore.setItemAsync(key, value);
  }
}

export function setItem(key, value) {
  if (Platform.OS === "web") {
    return localStorage.setItem(key, value);
  } else {
    return SecureStore.setItem(key, value);
  }
}

export function getItemAsync(key) {
  if (Platform.OS === "web") {
    return Promise.resolve(localStorage.getItem(key));
  } else {
    return SecureStore.getItemAsync(key);
  }
}

export function getItem(key) {
  if (Platform.OS === "web") {
    return localStorage.getItem(key);
  } else {
    return SecureStore.getItem(key);
  }
}

export function deleteItemAsync(key) {
  if (Platform.OS === "web") {
    return Promise.resolve(localStorage.removeItem(key));
  } else {
    return SecureStore.deleteItemAsync(key);
  }
}

export function deleteItem(key) {
  if (Platform.OS === "web") {
    return localStorage.removeItem(key);
  } else {
    return SecureStore.deleteItemAsync(key);
  }
}
