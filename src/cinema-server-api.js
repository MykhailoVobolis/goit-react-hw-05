import axios from "axios";

// axios.defaults.baseURL = "https://cinema-hall-app.onrender.com";

export async function registerUser(newUser) {
  const response = await axios.post("https://cinema-hall-app.onrender.com/auth/register", newUser);
  return response.data.data;
}

export async function loginUser(user) {
  const response = await axios.post("https://cinema-hall-app.onrender.com/auth/login", user);
  return response.data.data;
}

export async function logoutUser(email) {
  const response = await axios.post("https://cinema-hall-app.onrender.com/auth/logout", email);
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
