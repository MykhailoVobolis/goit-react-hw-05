import toast, { Toaster } from "react-hot-toast";

import MovieList from "../../components/MovieList/MovieList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";

import { useState, useEffect, useRef } from "react";
import { getPopularMovies } from "../../tmdb-api";

import css from "./MostPopularFilmsPage.module.css";

export default function MostPopularFilmsPage() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loaderBtn, setLoaderBtn] = useState(false);

  // Реалізація плавного скролу при додаванні нових зображень
  const firstNewFilmRef = useRef();

  useEffect(() => {
    firstNewFilmRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [popularMovies]);

  const nextPage = () => {
    setLoaderBtn(false);
    setLoading(true);
    setPage(page + 1);
  };

  useEffect(() => {
    async function fetchMovies() {
      try {
        setError(false);
        setLoading(true);
        const data = await getPopularMovies(page);
        setPopularMovies((prevPopularMovies) => {
          return popularMovies.length > 0 ? [...prevPopularMovies, ...data.results] : data.results;
        });
        setLoaderBtn(true);
        // Перевірка, чи це остання завантажена сторінка?
        if (page === data.total_pages) {
          //  Повідомлення про досягнення кінця результатів запиту
          toast("Вибачте, але ви досягли кінця результатів пошуку.", {
            style: {
              color: "#ffffff",
              backgroundColor: "#0099FF",
            },
          });
          setLoaderBtn(false);
        }
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
      <section className={css.popularMovies}>
        {loading && <Loader loading={loading} />}
        {popularMovies.length > 0 && (
          <div className={css.container}>
            <h2 className={css.popularMoviesTitle}>Найбільш популярні</h2>
            <MovieList ref={firstNewFilmRef} items={popularMovies} />
            {loaderBtn && <LoadMoreBtn nextPage={nextPage} />}
          </div>
        )}
      </section>
      {error && <ErrorMessage error={error} />}
      <Toaster position="top-right" containerStyle={{ zIndex: 99999999 }} />
    </>
  );
}
