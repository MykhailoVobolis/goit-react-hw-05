// import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Slider from "../../components/Slider/Slider";

import { useState, useEffect } from "react";
import { getPopularMovies } from "../../tmdb-api";
import { getMostRatingMovies } from "../../tmdb-api";

import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [mostRatingMovies, setMostRatingMovies] = useState([]);
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
      <section className={css.movies}>
        <div className={css.moviesContainer}>
          {/* {popularMovies.length > 0 && (
            <div>
              <h2 className={css.moviesTitle}>Найбільш популярні</h2>
              <MovieList items={popularMovies} />
            </div>
          )} */}
          {popularMovies.length > 0 && (
            <div className={css.container}>
              <h2 className={css.moviesTitle}>Найбільш популярні</h2>
              <Slider items={popularMovies} />
            </div>
          )}
          {mostRatingMovies.length > 0 && (
            <div className={css.container}>
              <h2 className={css.moviesTitle}>Найкраще за рейтингом TMDB</h2>
              <Slider items={mostRatingMovies} />
            </div>
          )}
          {loading && <Loader loading={loading} />}
          {error && <ErrorMessage error={error} />}
        </div>
      </section>
    </>
  );
}
