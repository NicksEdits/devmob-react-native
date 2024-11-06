import * as LocalStorage from "@/utils/localStorage";
import axios from "axios";
import apiConfig from "@/api.config.json";
const API_URL =
  apiConfig.local.protocol +
  "://" +
  apiConfig.local.host +
  ":" +
  apiConfig.local.port;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": API_URL,
  },
});

function setBearerHeader(token) {
  const tkn = token ?? LocalStorage.getItem("token");

  api.defaults.headers.common["Authorization"] = tkn
    ? `Bearer ${tkn}`
    : undefined;
}

export async function post(url, data, token = null) {
  setBearerHeader(token);
  const path = url.substring(0, 1) === "/" ? url : `/${url}`;

  return api.post(path, data).then((response) => response.data);
}

export function get(url, token = null) {
  setBearerHeader(token);
  const path = url.substring(0, 1) === "/" ? url : `/${url}`;

  return api.get(path).then((response) => response.data);
}

export function patch(url, data, token = null) {
  setBearerHeader(token);
  const path = url.substring(0, 1) === "/" ? url : `/${url}`;

  return api.patch(path, data).then((response) => response.data);
}

export function del(url, token = null) {
  setBearerHeader(token);
  const path = url.substring(0, 1) === "/" ? url : `/${url}`;

  return api.delete(path).then((response) => response.data);
}
