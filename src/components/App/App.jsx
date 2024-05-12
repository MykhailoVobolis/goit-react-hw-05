import Layout from "../Layout/Layout";

import { Routes, Route } from "react-router-dom";
import { lazy } from "react";

import "./App.css";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const SearchMoviesPage = lazy(() => import("../../pages/SearchMoviesPage/SearchMoviesPage"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() => import("../../pages/MovieDetailsPage/MovieDetailsPage"));
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage/NotFoundPage"));
const MovieCast = lazy(() => import("../MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("../MovieReviews/MovieReviews"));
const BestFilmsWeekPage = lazy(() => import("../../pages/BestFilmsWeekPage/BestFilmsWeekPage"));
const NowPlayingMoviesPage = lazy(() => import("../../pages/NowPlayingMoviesPage/NowPlayingMoviesPage"));
const MostPopularFilmsPage = lazy(() => import("../../pages/MostPopularFilmsPage/MostPopularFilmsPage"));
const BestRatingFilmsPage = lazy(() => import("../../pages/BestRatingFilmsPage/BestRatingFilmsPage"));

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchMoviesPage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/collection/best_films_week" element={<BestFilmsWeekPage />} />
        <Route path="/collection/now_playing_films" element={<NowPlayingMoviesPage />} />
        <Route path="/collection/most_popular_films" element={<MostPopularFilmsPage />} />
        <Route path="/collection/best_rating_films" element={<BestRatingFilmsPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}
