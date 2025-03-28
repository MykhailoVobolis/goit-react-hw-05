import axios from "axios";

const BASE_URL = "https://cinema-hall-app.onrender.com";

export async function registerUser(newUser) {
  const response = await axios.post(`${BASE_URL}/auth/register`, newUser, {
    withCredentials: true, // Важливо для відправки куків
  });
  return response.data.data;
}

export async function loginUser(user) {
  const response = await axios.post(`${BASE_URL}/auth/login`, user, {
    withCredentials: true, // Важливо для відправки куків
  });
  return response.data.data;
}

export async function logoutUser() {
  const response = await axios.post(
    `${BASE_URL}/auth/logout`,
    {},
    {
      withCredentials: true, // Важливо для відправки куків
    }
  );
  return response.data.data;
}

export async function refreshUser() {
  const response = await axios.post(
    `${BASE_URL}/auth/refresh`,
    {},
    {
      withCredentials: true, // Важливо для відправки куків
    }
  );
  return response.data.data;
}

export async function getGoogleUrl() {
  const response = await axios.get(`${BASE_URL}/auth/get-oauth-url`, {
    withCredentials: true, // Важливо для відправки куків
  });
  return response.data;
}

export async function confirmGoogleOAuth(code) {
  const response = await axios.post(
    `${BASE_URL}/auth/confirm-oauth`,
    { code },
    {
      withCredentials: true, // Важливо для відправки куків
    }
  );
  return response.data.data;
}

export async function addMovie(movie) {
  const response = await axios.post(`${BASE_URL}/movies`, movie, {
    withCredentials: true, // Важливо для відправки куків
  });
  return response.data.data;
}

export async function delMovie(id) {
  const response = await axios.delete(`${BASE_URL}/movies/${id}`, {
    withCredentials: true, // Важливо для відправки куків
  });
  return response.data.data;
}

export async function getFavoriteMovies() {
  const response = await axios.get(`${BASE_URL}/movies`, {
    withCredentials: true, // Важливо для відправки куків
  });
  return response.data.data.data;
}

export async function getMovieById(id) {
  const response = await axios.get(`${BASE_URL}/movies/${id}`, {
    withCredentials: true, // Важливо для відправки куків
  });
  return response.data.data;
}

export async function serverPing() {
  const response = await axios.get(`${BASE_URL}/ping`, {
    withCredentials: true, // Важливо для відправки куків
  });
  return response.data;
}
