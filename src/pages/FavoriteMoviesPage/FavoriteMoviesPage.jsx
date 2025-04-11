import axios from "axios";
import { useEffect, useState } from "react";
import { PiListDashes } from "react-icons/pi";
import { getFavoriteMovies, refreshUser } from "../../cinema-server-api.js";

import Loader from "../../components/Loader/Loader.jsx";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import MovieList from "../../components/MovieList/MovieList.jsx";

import css from "./FavoriteMoviesPage.module.css";

export default function FavoriteMoviesPage() {
  const [moviesFavorite, setMoviesFavorite] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        const data = await getFavoriteMovies();
        setMoviesFavorite((prevMoviesWeek) => {
          return moviesFavorite.length > 0 ? [...prevMoviesWeek, ...data] : data;
        });
      } catch (error) {
        const isTokenExpired = error?.response?.data?.data?.message === "Access token expired";
        const isUnauthorized = error?.status === 401;

        if (isTokenExpired && isUnauthorized) {
          try {
            // Оновлюємо токен
            const newTokens = await refreshUser();
            // Оновлюємо заголовок Authorization
            axios.defaults.headers.common["Authorization"] = `Bearer ${newTokens.accessToken}`;

            // Повторний запит після рефрешу
            const data = await getFavoriteMovies();

            setMoviesFavorite((prevMoviesWeek) => {
              return moviesFavorite.length > 0 ? [...prevMoviesWeek, ...data] : data;
            });
          } catch (refreshError) {
            console.error("Refresh error:", refreshError.message);
            localStorage.removeItem("wasLoggedIn");
            setError(true);
          }
        } else {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, []);

  return (
    <>
      <section className={css.favoriteMovies}>
        {loading && <Loader loading={loading} />}
        <div className={css.container}>
          <h2 className={css.favoriteMoviesTitle}>Обрані фільми</h2>
          {moviesFavorite.length > 0 ? (
            <MovieList items={moviesFavorite} />
          ) : (
            <div className={css.stub}>
              <PiListDashes className={css.subIcon} />
              <p className={css.title}>Тільки найкращі!</p>
              <p className={css.text}>Зберігайте улюблені фільми у серденьку і тут</p>
            </div>
          )}
        </div>
      </section>
      {error && <ErrorMessage error={error} />}
    </>
  );
}
