import MovieList from "../../components/MovieList/MovieList";
import { useState, useEffect } from "react";
import { getTrendingMovies } from "../../tmdb-api";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import toast, { Toaster } from "react-hot-toast";
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
      <section className={css.trendMovies}>
        {movies.length > 0 && (
          <div className={css.container}>
            <h2 className={css.trendMoviesTitle}>Топ 20 тижня</h2>
            <MovieList items={movies} />
          </div>
        )}
      </section>
      {error && <ErrorMessage error={error} />}
      <Toaster position="top-right" />
    </>
  );
}
