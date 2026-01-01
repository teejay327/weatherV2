export const API_BASE = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "");
if (!API_BASE) throw new Error("VITE_API_BASE_URL is not defined");

export const apiUrl = (path = "") => {
  const cleanPath = String(path).startsWith("/") ? path: `/${path}`;
  return `${API_BASE}${cleanPath}`;
}

