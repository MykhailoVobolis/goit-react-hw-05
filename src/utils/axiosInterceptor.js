import axios from "axios";

import { refreshUser } from "../cinema-server-api.js";

const instance = axios.create({
  baseURL: "https://cinema-hall-app.onrender.com",
  withCredentials: true,
});

export const setAuthHeader = (token) => {
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  instance.defaults.headers.common["Authorization"] = "";
};

// Інтерсептор для обробки відповіді
instance.interceptors.response.use(
  (response) => response, // Повертаємо відповідь, якщо вона успішна
  async (error) => {
    const originalRequest = error.config;

    // Перевірка на помилку 401 (неавторизований доступ)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Кастомне поле для відслідковування, чи ми вже пробували оновити токен. Запобігає нескінченному циклу

      try {
        // Виклик refreshUser для отримання нового токена
        const result = await refreshUser();

        if (result.accessToken) {
          // Якщо токен оновлений, оновлюємо заголовки і повторюємо запит
          setAuthHeader(result.accessToken);
          originalRequest.headers["Authorization"] = `Bearer ${result.accessToken}`;
          return instance(originalRequest); // Повторний запит
        }
      } catch (refreshError) {
        console.error("Failed to refresh token", refreshError);
        clearAuthHeader();
        localStorage.removeItem("wasLoggedIn");
      }
    }

    return Promise.reject(error); // Якщо помилка не 401 або інша проблема - повертаємо її
  }
);

export default instance;
