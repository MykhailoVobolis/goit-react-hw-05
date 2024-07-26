import axios from "axios";

// axios.defaults.baseURL = "https://cinema-hall-app.onrender.com";

export async function registerUser(newUser) {
  const response = await axios.post("https://cinema-hall-app.onrender.com/auth/register", newUser);
  return response.data.data;
}

export async function loginUser(newUser) {
  const response = await axios.post("https://cinema-hall-app.onrender.com/auth/login", newUser);
  return response.data.data;
}

export async function logoutUser() {
  const response = await axios.post("https://cinema-hall-app.onrender.com/auth/logout");
  return response.data.data;
}

export async function getGoogleUrl() {
  const response = await axios.get("https://cinema-hall-app.onrender.com/auth/get-oauth-url");
  return response.data;
}

export async function confirmGoogleOAuth(code) {
  const response = await axios.post("https://cinema-hall-app.onrender.com/auth/confirm-oauth", { code });
  return response.data.data;
}
