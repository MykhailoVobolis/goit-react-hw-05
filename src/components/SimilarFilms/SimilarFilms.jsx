import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import Slider from "../Slider/Slider";

import { getSimilarFilms } from "../../tmdb-api";
import { useState, useEffect } from "react";

import css from "./SimilarFilms.module.css";

export default function SimilarFilms({ movieId }) {
  const [similarFilms, setSimilarFilms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        const data = await getSimilarFilms(movieId);
        setSimilarFilms((prevSimilarFilms) => {
          return similarFilms.length > 0 ? [...prevSimilarFilms, ...data] : data;
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
        {loading && <Loader loading={loading} />}
        {similarFilms.length > 0 && (
          <div className={css.container}>
            <h2 className={css.similarFilmsTitle}>Що ще подивитися</h2>
            <Slider items={similarFilms} />
          </div>
        )}
      </section>
      {error && <ErrorMessage error={error} />}
    </>
  );
}
