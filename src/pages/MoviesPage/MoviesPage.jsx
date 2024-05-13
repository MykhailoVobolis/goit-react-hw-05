import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Slider from "../../components/Slider/Slider";
import SliderMoviesMain from "../../components/SliderMoviesMain/SliderMoviesMain";

import { useState, useEffect } from "react";
import { getPopularMovies, getMostRatingMovies, getNowPlaying, getUpcomingMovies } from "../../tmdb-api";
import { Link } from "react-router-dom";

import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [moviesNowPlaying, setMoviesNowPlaying] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [mostRatingMovies, setMostRatingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        const data = await getPopularMovies(page);
        setPopularMovies((prevPopularMovies) => {
          return popularMovies.length > 0 ? [...prevPopularMovies, ...data.results] : data.results;
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
        const data = await getMostRatingMovies(page);
        setMostRatingMovies((prevMostRatingMovies) => {
          return mostRatingMovies.length > 0 ? [...prevMostRatingMovies, ...data.results] : data.results;
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
        const data = await getNowPlaying(page);
        setMoviesNowPlaying((prevMoviesNowPlaying) => {
          return moviesNowPlaying.length > 0 ? [...prevMoviesNowPlaying, ...data.results] : data.results;
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
        const data = await getUpcomingMovies(page);
        setUpcomingMovies((prevUpcomingMovies) => {
          return upcomingMovies.length > 0 ? [...prevUpcomingMovies, ...data.results] : data.results;
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
        <SliderMoviesMain items={upcomingMovies} />
        <div className={css.moviesContainer}>
          {moviesNowPlaying.length > 0 && (
            <div className={css.container}>
              <div className={css.titleContainer}>
                <Link className={css.moviesTitle} to={`/collection/now_playing_films`}>
                  Зараз у кінотеатрах
                </Link>
                <Link to={`/collection/now_playing_films`}>Показати більше</Link>
              </div>
              <Slider items={moviesNowPlaying} />
            </div>
          )}
          {popularMovies.length > 0 && (
            <div className={css.container}>
              <div className={css.titleContainer}>
                <Link className={css.moviesTitle} to={`/collection/most_popular_films`}>
                  Найбільш популярні
                </Link>
                <Link to={`/collection/most_popular_films`}>Показати більше</Link>
              </div>
              <Slider items={popularMovies} />
            </div>
          )}
          {mostRatingMovies.length > 0 && (
            <div>
              <div className={css.titleContainer}>
                <Link className={css.moviesTitle} to={`/collection/best_rating_films`}>
                  Найкраще за рейтингом TMDB
                </Link>
                <Link to={`/collection/best_rating_films`}>Показати більше</Link>
              </div>
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
