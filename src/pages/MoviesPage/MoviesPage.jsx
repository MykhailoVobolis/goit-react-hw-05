import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Slider from "../../components/Slider/Slider";
import SliderMoviesMain from "../../components/SliderMoviesMain/SliderMoviesMain";
import InfoBestMovies from "../../components/InfoBestMovies/InfoBestMovies";

import { useState, useEffect } from "react";
import { getPopularMovies, getMostRatingMovies, getNowPlaying, getUpcomingMovies } from "../../tmdb-api";
import { Link } from "react-router-dom";
import { GrNext } from "react-icons/gr";

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
      {error && <ErrorMessage error={error} />}
      {loading && <Loader loading={loading} />}
      {upcomingMovies.length > 0 && (
        <section className={css.movies}>
          <SliderMoviesMain items={upcomingMovies} />
          <div className={css.nowPlayMoviesContainer}>
            {moviesNowPlaying.length > 0 && (
              <div className={css.container}>
                <div className={css.titleContainer}>
                  <Link className={css.moviesTitle} to={`/collection/now_playing_films`}>
                    Зараз у кінотеатрах
                  </Link>
                  <Link className={css.moreLink} to={`/collection/now_playing_films`}>
                    Показати більше
                  </Link>
                  <Link className={css.moreLinkMob} to={`/collection/now_playing_films`}>
                    <GrNext className={css.moreIcon} />
                  </Link>
                </div>
                <Slider items={moviesNowPlaying} />
              </div>
            )}
          </div>
          <InfoBestMovies />
          <div className={css.moviesContainer}>
            {popularMovies.length > 0 && (
              <div className={css.container}>
                <div className={css.titleContainer}>
                  <Link className={css.moviesTitle} to={`/collection/most_popular_films`}>
                    Найбільш популярні
                  </Link>
                  <Link className={css.moreLink} to={`/collection/most_popular_films`}>
                    Показати більше
                  </Link>
                  <Link className={css.moreLinkMob} to={`/collection/most_popular_films`}>
                    <GrNext className={css.moreIcon} />
                  </Link>
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
                  <Link className={css.moreLink} to={`/collection/best_rating_films`}>
                    Показати більше
                  </Link>
                  <Link className={css.moreLinkMob} to={`/collection/best_rating_films`}>
                    <GrNext className={css.moreIcon} />
                  </Link>
                </div>
                <Slider items={mostRatingMovies} />
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}
