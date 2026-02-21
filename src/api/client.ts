import axios from "axios";

const getUsername = () => localStorage.getItem("username") ?? "";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  headers: { "Content-Type": "application/json" },
});

// 요청마다 Authorization 헤더 주입
instance.interceptors.request.use((config) => {
  config.headers.Authorization = getUsername();
  return config;
});

// 기존 코드와 동일한 인터페이스 유지 (get<T> → Promise<T>)
export const apiClient = {
  get: <T>(path: string) =>
    instance.get<T>(path).then((r) => r.data),
  post: <T>(path: string, body?: unknown) =>
    instance.post<T>(path, body).then((r) => r.data),
  patch: <T>(path: string, body?: unknown) =>
    instance.patch<T>(path, body).then((r) => r.data),
  delete: <T>(path: string) =>
    instance.delete<T>(path).then((r) => r.data),
};
