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

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchMoviesPage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/collection/best_films_week" element={<BestFilmsWeekPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}
