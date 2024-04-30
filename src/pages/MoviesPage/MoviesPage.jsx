import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import { useState, useEffect } from "react";
import { getPopularMovies } from "../../tmdb-api";

import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        const data = await getPopularMovies();
        setPopularMovies((prevPopularMovies) => {
          return popularMovies.length > 0 ? [...prevPopularMovies, ...data] : data;
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
      <section className={css.movies}>
        <div className={css.container}>
          {popularMovies.length > 0 && (
            <div>
              <h2 className={css.popularTitle}>Найбільш популярні</h2>
              <MovieList items={popularMovies} />
            </div>
          )}
          {loading && <Loader loading={loading} />}
          {error && <ErrorMessage error={error} />}
        </div>
      </section>
    </>
  );
}
