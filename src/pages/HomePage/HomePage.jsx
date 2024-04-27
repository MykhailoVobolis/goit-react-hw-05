import MovieList from "../../components/MovieList/MovieList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";

import { getTrendingMovies } from "../../tmdb-api";
import { useState, useEffect } from "react";

import css from "./HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        const data = await getTrendingMovies();
        setMovies((prevMovies) => {
          return movies.length > 0 ? [...prevMovies, ...data] : data;
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
      <section>
        <div className={css.hero}>
          <h1 className={css.mainTitle}>Світові новинки кіно на CINEMA HALL</h1>
        </div>
      </section>
      <section className={css.trendMovies}>
        {loading && <Loader loading={loading} />}
        {movies.length > 0 && (
          <div className={css.container}>
            <h2 className={css.trendMoviesTitle}>Топ 20 цього тижня</h2>
            <MovieList items={movies} />
          </div>
        )}
      </section>
      {error && <ErrorMessage error={error} />}
    </>
  );
}
