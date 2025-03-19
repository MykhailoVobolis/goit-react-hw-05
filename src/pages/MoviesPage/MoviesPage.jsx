import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Slider from "../../components/Slider/Slider";
import SliderMoviesMain from "../../components/SliderMoviesMain/SliderMoviesMain";
import InfoBestMovies from "../../components/InfoBestMovies/InfoBestMovies";
import GenresForMoviesBar from "../../components/GenresForMoviesBar/GenresForMoviesBar.jsx";

import { useState, useEffect } from "react";
import {
  getPopularMovies,
  getMostRatingMovies,
  getNowPlaying,
  getUpcomingMovies,
  getGenresMovies,
} from "../../tmdb-api";
import { Link } from "react-router-dom";
import { GrNext } from "react-icons/gr";

import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [moviesNowPlaying, setMoviesNowPlaying] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [mostRatingMovies, setMostRatingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [genresMovies, setGenresMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        const [popular, rating, nowPlaying, upcoming, genresAll] = await Promise.all([
          getPopularMovies(page),
          getMostRatingMovies(page),
          getNowPlaying(page),
          getUpcomingMovies(page),
          getGenresMovies(),
        ]);
        setPopularMovies(popular.results);
        setMostRatingMovies(rating.results);
        setMoviesNowPlaying(nowPlaying.results);
        setUpcomingMovies(upcoming.results);
        setGenresMovies(genresAll.genres);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, [page]);

  return (
    <>
      {error && <ErrorMessage error={error} />}
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <section className={css.movies}>
          <div className={css.pageTitleContainer}>
            <h2 className={css.pageTitle}>Фільми</h2>
          </div>
          {upcomingMovies.length > 0 && <SliderMoviesMain items={upcomingMovies} />}
          <GenresForMoviesBar genres={genresMovies} />
          <div className={css.nowPlayMoviesContainer}>
            {moviesNowPlaying.length > 0 && (
              <div className={css.container}>
                <div className={css.titleContainer}>
                  <Link className={css.moviesTitle} to={`/collection/now_playing_films`}>
                    Зараз у кіно
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
