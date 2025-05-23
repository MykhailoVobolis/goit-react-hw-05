import Layout from "../Layout/Layout";

import { Routes, Route } from "react-router-dom";
import { lazy, useEffect, useState } from "react";
import { refreshUser, serverPing } from "../../cinema-server-api.js";
import { useUser } from "../../userContext.jsx";

import Loader from "../Loader/Loader.jsx";
import RestrictedRoute from "../RestrictedRoute.jsx";
import PrivateRoute from "../PrivateRoute.jsx";

import "./App.css";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const RegisterPage = lazy(() => import("../../pages/RegisterPage/RegisterPage.jsx"));
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage.jsx"));
const ConfirmGoogleAuth = lazy(() => import("../../pages/ConfirmGoogleAuth/ConfirmGoogleAuth.jsx"));
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
const FavoriteMoviesPage = lazy(() => import("../../pages/FavoriteMoviesPage/FavoriteMoviesPage.jsx"));
const MoviesByGenrePage = lazy(() => import("../../pages/MoviesByGenrePage/MoviesByGenrePage.jsx"));
const MoviesByCompanyPage = lazy(() => import("../../pages/MoviesByCompanyPage/MoviesByCompanyPage.jsx"));

export default function App() {
  const { authContext } = useUser();
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    // Пінгуємо сервер при завантаженні додатка
    serverPing();
    // Пінг срверу кожні 14 хвилин
    const intervalId = setInterval(() => {
      serverPing();
    }, 840000);

    // Відновлюємо пінг, коли вкладка знову отримує фокус
    const handleFocus = () => {
      serverPing();
    };
    // Слухаємо подію фокусу
    window.addEventListener("focus", handleFocus);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  useEffect(() => {
    async function refresh() {
      try {
        const response = await refreshUser();
        authContext(response);
      } catch (error) {
        console.error("Refresh error:", error.message);
        localStorage.removeItem("wasLoggedIn"); // Очищуємо  local storage, якщо рефреш провалився
      } finally {
        setLoading(false);
        setIsRefreshing(false);
      }
    }

    const wasLoggedIn = localStorage.getItem("wasLoggedIn");

    if (wasLoggedIn) {
      setIsRefreshing(true);
      setLoading(true);
      refresh();
    }
  }, [authContext]);

  return (
    <>
      {isRefreshing ? (
        <Loader loading={loading} />
      ) : (
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RestrictedRoute component={<RegisterPage />} redirectTo="/" />} />
            <Route path="/login" element={<RestrictedRoute component={<LoginPage />} redirectTo="/" />} />
            <Route path="/watching" element={<PrivateRoute component={<FavoriteMoviesPage />} redirectTo="/login" />} />
            <Route path="/confirm-google-auth" element={<ConfirmGoogleAuth />} />
            <Route path="/search" element={<SearchMoviesPage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/collection/best_films_week" element={<BestFilmsWeekPage />} />
            <Route path="/collection/now_playing_films" element={<NowPlayingMoviesPage />} />
            <Route path="/collection/most_popular_films" element={<MostPopularFilmsPage />} />
            <Route path="/collection/best_rating_films" element={<BestRatingFilmsPage />} />
            <Route path="/collection/movies_by_genre" element={<MoviesByGenrePage />} />
            <Route path="/collection/movies_by_company" element={<MoviesByCompanyPage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      )}
    </>
  );
}
