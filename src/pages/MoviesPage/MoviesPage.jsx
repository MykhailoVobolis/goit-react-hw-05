import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Slider from "../../components/Slider/Slider";
import SliderMoviesMain from "../../components/SliderMoviesMain/SliderMoviesMain";
import InfoBestMovies from "../../components/InfoBestMovies/InfoBestMovies";
import GenresForMoviesBar from "../../components/GenresForMoviesBar/GenresForMoviesBar.jsx";

import { useQuery } from "@tanstack/react-query";
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

const fetchAllMoviesData = async (page) => {
  const [popular, rating, nowPlaying, upcoming, genres] = await Promise.all([
    getPopularMovies(page),
    getMostRatingMovies(page),
    getNowPlaying(page),
    getUpcomingMovies(page),
    getGenresMovies(),
  ]);

  return { popular, rating, nowPlaying, upcoming, genres };
};

export default function MoviesPage() {
  const page = 1;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["moviesData", page],
    queryFn: () => fetchAllMoviesData(page),
  });

  const { popular, rating, nowPlaying, upcoming, genres } = data || {};

  const popularMovies = popular?.results || [];
  const mostRatingMovies = rating?.results || [];
  const moviesNowPlaying = nowPlaying?.results || [];
  const upcomingMovies = upcoming?.results || [];
  const genresMovies = genres?.genres || [];

  return (
    <>
      {isError && <ErrorMessage error={isError} />}
      {isLoading ? (
        <Loader loading={isLoading} />
      ) : (
        <section className={css.movies}>
          <div className={css.pageTitleContainer}>
            <h2 className={css.pageTitle}>Фільми</h2>
          </div>
          {upcomingMovies.length > 0 && <SliderMoviesMain items={upcomingMovies} />}
          <GenresForMoviesBar genres={genresMovies} description="Обери фільм на будь-який смак" />
          <div className={css.nowPlayMoviesContainer}>
            {moviesNowPlaying.length > 0 && (
              <div className={css.container}>
                <div className={css.titleContainer}>
                  <Link className={css.moviesTitle} to={`/collection/now_playing_films`} aria-label="Show more movies">
                    Зараз у кіно
                  </Link>
                  <Link className={css.moreLink} to={`/collection/now_playing_films`} aria-label="Show more movies">
                    Показати більше
                  </Link>
                  <Link className={css.moreLinkMob} to={`/collection/now_playing_films`} aria-label="Show more movies">
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
                  <Link className={css.moviesTitle} to={`/collection/most_popular_films`} aria-label="Show more movies">
                    Найбільш популярні
                  </Link>
                  <Link className={css.moreLink} to={`/collection/most_popular_films`} aria-label="Show more movies">
                    Показати більше
                  </Link>
                  <Link className={css.moreLinkMob} to={`/collection/most_popular_films`} aria-label="Show more movies">
                    <GrNext className={css.moreIcon} />
                  </Link>
                </div>
                <Slider items={popularMovies} />
              </div>
            )}
            {mostRatingMovies.length > 0 && (
              <div>
                <div className={css.titleContainer}>
                  <Link className={css.moviesTitle} to={`/collection/best_rating_films`} aria-label="Show more movies">
                    Найкраще за рейтингом TMDB
                  </Link>
                  <Link className={css.moreLink} to={`/collection/best_rating_films`} aria-label="Show more movies">
                    Показати більше
                  </Link>
                  <Link className={css.moreLinkMob} to={`/collection/best_rating_films`} aria-label="Show more movies">
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
