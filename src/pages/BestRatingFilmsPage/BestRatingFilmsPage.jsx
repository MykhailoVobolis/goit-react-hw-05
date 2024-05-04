import MovieList from "../../components/MovieList/MovieList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";

import { getMostRatingMovies } from "../../tmdb-api";
import { useState, useEffect } from "react";

import css from "./BestRatingFilmsPage.module.css";

export default function BestRatingFilmsPage() {
  const [mostRatingMovies, setMostRatingMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        const data = await getMostRatingMovies();
        setMostRatingMovies((prevMostRatingMovies) => {
          return mostRatingMovies.length > 0 ? [...prevMostRatingMovies, ...data] : data;
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
      <section className={css.bestMovies}>
        {loading && <Loader loading={loading} />}
        {mostRatingMovies.length > 0 && (
          <div className={css.container}>
            <h2 className={css.bestMoviesTitle}>Найкраще за рейтингом TMDB</h2>
            <MovieList items={mostRatingMovies} />
          </div>
        )}
      </section>
      {error && <ErrorMessage error={error} />}
    </>
  );
}
