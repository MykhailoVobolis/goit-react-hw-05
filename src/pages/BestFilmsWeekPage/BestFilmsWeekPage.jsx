import MovieList from "../../components/MovieList/MovieList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";

import { getWeekMovies } from "../../tmdb-api";
import { useState, useEffect } from "react";

import css from "./BestFilmsWeekPage.module.css";

export default function BestFilmsWeekPage() {
  const [moviesWeek, setMoviesWeek] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        const data = await getWeekMovies();
        setMoviesWeek((prevMoviesWeek) => {
          return moviesWeek.length > 0 ? [...prevMoviesWeek, ...data] : data;
        });
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, []);

  return (
    <>
      <section className={css.trendMovies}>
        {loading && <Loader loading={loading} />}
        {moviesWeek.length > 0 && (
          <div className={css.container}>
            <h2 className={css.trendMoviesTitle}>Найкращі фільми тижня</h2>
            <MovieList items={moviesWeek} />
          </div>
        )}
      </section>
      {error && <ErrorMessage error={error} />}
    </>
  );
}
