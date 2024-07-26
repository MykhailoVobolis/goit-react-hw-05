import axios from "axios";
import { createContext, useContext, useState } from "react";

import { loginUser, logoutUser, registerUser } from "./cinema-server-api.js";

import Loader from "./components/Loader/Loader.jsx";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage.jsx";

const userContext = createContext();

export const useUser = () => useContext(userContext);

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
      localStorage.setItem("token", response.accessToken);
      // Додавання хедерів з токіном до всіх наступних будь яких типів запитів (common)
      setAuthHeader(response.accessToken);
    } catch (error) {
      setError(true);
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
      localStorage.setItem("token", response.accessToken);
      // Додавання хедерів з токіном до всіх наступних будь яких типів запитів (common)
      setAuthHeader(response.accessToken);
    } catch (error) {
      console.log("error!!!!");
      setError(true);
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
      localStorage.removeItem("token");
      // Видалення хедеру при виходу користувача з App
      clearAuthHeader();
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const googleAuthContext = (data) => {
    setUser(data.user);
    setIsLoggedIn(true);
    setAuthHeader(data.accessToken);
  };

  return (
    <userContext.Provider value={{ isLoggedIn, user, loading, error, logIn, logOut, register, googleAuthContext }}>
      {children}
      {loading && <Loader loading={loading} />}
      {error && <ErrorMessage error={error} />}
    </userContext.Provider>
  );
};
