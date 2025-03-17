import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const options = {
  method: "GET",
  params: { language: "uk-UA", region: "UA" },
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

export async function getWeekMovies() {
  const response = await axios.get("trending/movie/week", options);
  return response.data.results;
}

export async function getDetailsMovie(id) {
  const response = await axios.get(`movie/${id}`, options);

  return response.data;
}

export async function searchMovies(search, page) {
  const response = await axios.get(`search/movie?page=${page}&query=${search}`, options);
  return response.data;
}

export async function getMovieCast(id) {
  const response = await axios.get(`movie/${id}/credits`, options);
  return response.data;
}

export async function getMovieReviews(id) {
  const response = await axios.get(`movie/${id}/reviews`, optionsUs);
  return response.data;
}

export async function getMovieVideo(id) {
  const response = await axios.get(`movie/${id}/videos`, options);

  return response.data.results;
}

export async function getPopularMovies(page) {
  const response = await axios.get(`movie/popular?page=${page}`, options);
  return response.data;
}

export async function getMostRatingMovies(page) {
  const response = await axios.get(`movie/top_rated?page=${page}`, options);
  return response.data;
}

export async function getNowPlaying(page) {
  const response = await axios.get(`movie/now_playing?page=${page}`, options);
  return response.data;
}

export async function getSimilarFilms(movieId) {
  const response = await axios.get(`/movie/${movieId}/similar`, options);
  return response.data.results;
}

export async function getUpcomingMovies(page) {
  const response = await axios.get(`movie/upcoming?page=${page}`, options);
  return response.data;
}

export async function getGenresMovies() {
  const response = await axios.get("/genre/movie/list?language=en", options);
  return response.data;
}

export async function getMoviesByGenre(genreId, page) {
  const response = await axios.get(`/discover/movie`, {
    ...options,
    params: {
      ...options.params,
      with_genres: genreId,
      page,
    },
  });
  return response.data;
}

export async function getMoviesByCompany(companyId, page) {
  const response = await axios.get(`/discover/movie`, {
    ...options,
    params: {
      ...options.params,
      with_companies: companyId,
      page,
    },
  });
  return response.data;
}
