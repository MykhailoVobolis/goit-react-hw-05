import axios from "axios";

// axios.defaults.baseURL = "https://cinema-hall-app.onrender.com";

export async function registerUser(newUser) {
  const response = await axios.post("https://cinema-hall-app.onrender.com/auth/register", newUser, {
    withCredentials: true, // Важливо для відправки куків
  });
  return response.data.data;
}

export async function loginUser(user) {
  const response = await axios.post("https://cinema-hall-app.onrender.com/auth/login", user, {
    withCredentials: true, // Важливо для відправки куків
  });
  return response.data.data;
}

export async function logoutUser() {
  const response = await axios.post(
    "https://cinema-hall-app.onrender.com/auth/logout",
    {},
    {
      withCredentials: true, // Важливо для відправки куків
    }
  );
  return response.data.data;
}

export async function refreshUser() {
  const response = await axios.post(
    "https://cinema-hall-app.onrender.com/auth/refresh",
    {},
    {
      withCredentials: true, // Важливо для відправки куків
    }
  );
  return response.data.data;
}

export async function getGoogleUrl() {
  const response = await axios.get("https://cinema-hall-app.onrender.com/auth/get-oauth-url", {
    withCredentials: true, // Важливо для відправки куків
  });
  return response.data;
}

export async function confirmGoogleOAuth(code) {
  const response = await axios.post(
    "https://cinema-hall-app.onrender.com/auth/confirm-oauth",
    { code },
    {
      withCredentials: true, // Важливо для відправки куків
    }
  );
  return response.data.data;
}

export async function addMovie(movie) {
  const response = await axios.post("https://cinema-hall-app.onrender.com/movies", movie, {
    withCredentials: true, // Важливо для відправки куків
  });
  return response.data.data;
}

export async function delMovie(id) {
  const response = await axios.delete(`https://cinema-hall-app.onrender.com/movies/${id}`, {
    withCredentials: true, // Важливо для відправки куків
  });
  return response.data.data;
}

export async function getFavoriteMovies() {
  const response = await axios.get("https://cinema-hall-app.onrender.com/movies", {
    withCredentials: true, // Важливо для відправки куків
  });
  return response.data.data.data;
}

export async function getMovieById(id) {
  const response = await axios.get(`https://cinema-hall-app.onrender.com/movies/${id}`, {
    withCredentials: true, // Важливо для відправки куків
  });
  return response.data.data;
}
