export const API_BASE = (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000").replace(/\/+$/, "");

export const apiUrl = (path = "") => {
  const cleanPath = String(path).startsWith("/") ? path: `/${path}`;
  return `${API_BASE}${cleanPath}`;
}

