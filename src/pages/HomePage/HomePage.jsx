import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import Slider from "../../components/Slider/Slider";
import TvAdvertising from "../../components/TvAdvertising/TvAdvertising";

import { getWeekMovies } from "../../tmdb-api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import css from "./HomePage.module.css";

export default function HomePage() {
  const [moviesWeek, setMoviesWeek] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        const data = await getWeekMovies();
        setMoviesWeek((prevMoviesWeek) => {
          return moviesWeek.length > 0 ? [...prevMoviesWeek, ...data] : data;
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
      <TvAdvertising />
      <section className={css.trendMovies}>
        {loading && <Loader loading={loading} />}
        {moviesWeek.length > 0 && (
          <div className={css.container}>
            <div className={css.titleContainer}>
              <Link className={css.trendMoviesTitle} to={`/collection/best_films_week`}>
                Топ 20 цього тижня
              </Link>
            </div>
            <Slider items={moviesWeek} />
          </div>
        )}
      </section>
      {error && <ErrorMessage error={error} />}
    </>
  );
}
