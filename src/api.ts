const API_URL = import.meta.env.VITE_API_URL || "";

export const apiFetch = (endpoint: string, options: RequestInit = {}) => {
  return fetch(API_URL + endpoint, {
    ...options,
    credentials: "include", // Required for Admin Session cookies across domains
  });
};
