import instance from "./utils/axiosInterceptor.js";

export async function registerUser(newUser) {
  const response = await instance.post("/auth/register", newUser);
  return response.data.data;
}

export async function loginUser(user) {
  const response = await instance.post(`/auth/login`, user);
  return response.data.data;
}

export async function logoutUser() {
  const response = await instance.post("/auth/logout", {});
  return response.data.data;
}

export async function refreshUser() {
  const response = await instance.post("/auth/refresh", {});
  return response.data.data;
}

export async function getGoogleUrl() {
  const response = await instance.get("/auth/get-oauth-url");
  return response.data;
}

export async function confirmGoogleOAuth(code) {
  const response = await instance.post("/auth/confirm-oauth", { code });
  return response.data.data;
}

export async function addMovie(movie) {
  const response = await instance.post("/movies", movie);
  return response.data.data;
}

export async function delMovie(id) {
  const response = await instance.delete(`/movies/${id}`);
  return response.data.data;
}

export async function getFavoriteMovies() {
  const response = await instance.get("/movies");
  return response.data.data.data;
}

export async function getMovieById(id) {
  const response = await instance.get(`/movies/${id}`);
  return response.data.data;
}

export async function serverPing() {
  const response = await instance.get("/ping");
  return response.data;
}
