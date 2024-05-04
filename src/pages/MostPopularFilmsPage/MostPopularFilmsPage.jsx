import MovieList from "../../components/MovieList/MovieList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";

import { getPopularMovies } from "../../tmdb-api";
import { useState, useEffect } from "react";

import css from "./MostPopularFilmsPage.module.css";

export default function MostPopularFilmsPage() {
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
      <section className={css.popularMovies}>
        {loading && <Loader loading={loading} />}
        {popularMovies.length > 0 && (
          <div className={css.container}>
            <h2 className={css.popularMoviesTitle}>Найбільш популярні</h2>
            <MovieList items={popularMovies} />
          </div>
        )}
      </section>
      {error && <ErrorMessage error={error} />}
    </>
  );
}
