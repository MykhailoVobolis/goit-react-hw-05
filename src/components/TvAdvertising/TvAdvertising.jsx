import tvMacup from "../../img/tv-macup.png";
import SliderTv from "../SliderTv/SliderTv";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";

import { getNowPlaying } from "../../tmdb-api";
import { useState, useEffect } from "react";

import css from "./TvAdvertising.module.css";

export default function TvAdvertising() {
  const [moviesNowPlaying, setMoviesNowPlaying] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        const data = await getNowPlaying();
        setMoviesNowPlaying((prevNowPlaying) => {
          return moviesNowPlaying.length > 0 ? [...prevNowPlaying, ...data] : data;
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
    <section className={css.tvAdvertising}>
      {loading && <Loader loading={loading} />}
      <div className={css.container}>
        <div className={css.titleContainer}>
          <h2 className={css.title}>Насолоджуйся українським дубляжем</h2>
        </div>
        <div className={css.tvMacupContainer}>
          <img className={css.macup} src={tvMacup} alt="tv macup" width={640} height={480} />
          <SliderTv items={moviesNowPlaying} />
        </div>
      </div>
      {error && <ErrorMessage error={error} />}
    </section>
  );
}
