import axios from "axios";
import { createContext, useContext, useState } from "react";

import { loginUser, logoutUser, registerUser } from "./cinema-server-api.js";

import Loader from "./components/Loader/Loader.jsx";
import toast, { Toaster } from "react-hot-toast";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage.jsx";

const userContext = createContext();

export const useUser = () => useContext(userContext);

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [authProcess, setAuthProcess] = useState(true); // Стан процесу перевірки аутентифікації

  const setAuthHeader = (token) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const clearAuthHeader = () => {
    axios.defaults.headers.common["Authorization"] = "";
  };

  const register = async (value) => {
    try {
      setLoading(true);
      const response = await registerUser(value);
      setUser(response.data);
      setIsLoggedIn(true);
      setAuthProcess(false);
      localStorage.setItem("accessToken", response.accessToken);
      // Додавання хедерів з токіном до всіх наступних будь яких типів запитів (common)
      setAuthHeader(response.accessToken);
    } catch (error) {
      toast("Користувач з такою адресою електронної пошти вже зареєстрований.", {
        style: {
          color: "#431f05",
          backgroundColor: "#fec90c",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const logIn = async (value) => {
    try {
      setLoading(true);
      const response = await loginUser(value);
      setUser(response.user);
      setIsLoggedIn(true);
      setAuthProcess(false);
      localStorage.setItem("accessToken", response.accessToken);
      // Додавання хедерів з токіном до всіх наступних будь яких типів запитів (common)
      setAuthHeader(response.accessToken);
    } catch (error) {
      toast("Користувача не знайдено. Будь ласка, перевірте введені дані.", {
        style: {
          color: "#431f05",
          backgroundColor: "#fec90c",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    try {
      setLoading(true);
      setIsLoggedIn(false);
      setUser(null);
      const response = await logoutUser();
      localStorage.removeItem("accessToken");
      // Видалення хедеру при виходу користувача з App
      clearAuthHeader();
      window.location.href = "/login";
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const authContext = (data) => {
    setUser(data.user);
    setIsLoggedIn(true);
    setAuthHeader(data.accessToken);
    setAuthProcess(false);
  };

  return (
    <userContext.Provider
      value={{ isLoggedIn, user, loading, error, logIn, logOut, register, authContext, authProcess }}>
      {children}
      {loading && <Loader loading={loading} />}
      {error && <ErrorMessage error={error} />}
      <Toaster position="top-right" containerStyle={{ zIndex: 99999999 }} />
    </userContext.Provider>
  );
};
