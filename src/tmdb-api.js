import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const options = {
  method: "GET",
  params: { language: "uk" },
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjM2MGQ4N2E5YWU5YTcwMDJlYjk1MzRjMTk0NjE3YiIsInN1YiI6IjY2MjI2ZjIzMzJjYzJiMDE3YzBlODk3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zAI2qYPR2dvrk2tOjJViXezQgezhNBB0V6jlXWpYycY",
  },
};

const optionsUs = {
  method: "GET",
  params: { language: "en-US" },
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjM2MGQ4N2E5YWU5YTcwMDJlYjk1MzRjMTk0NjE3YiIsInN1YiI6IjY2MjI2ZjIzMzJjYzJiMDE3YzBlODk3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zAI2qYPR2dvrk2tOjJViXezQgezhNBB0V6jlXWpYycY",
  },
};

export async function getTrendingMovies() {
  const response = await axios.get("trending/movie/week", options);
  return response.data.results;
}

export async function getDetailsMovie(id) {
  const response = await axios.get(`movie/${id}`, options);

  return response.data;
}

export async function searchMovies(search) {
  const response = await axios.get(`search/movie?page=1&query=${search}`, options);
  return response.data.results;
}

export async function getMovieCast(id) {
  const response = await axios.get(`movie/${id}/credits`, options);

  return response.data;
}

export async function getMovieReviews(id) {
  const response = await axios.get(`movie/${id}/reviews`, optionsUs);

  return response.data;
}
