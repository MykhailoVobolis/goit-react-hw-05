import toast, { Toaster } from "react-hot-toast";

import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import SearchBar from "../../components/SearchBar/SearchBar";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../tmdb-api";

import css from "./SearchMoviesPage.module.css";

export default function SearchMoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [loaderBtn, setLoaderBtn] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const inputValue = searchParams.get("name");

  // Реалізація плавного скролу при додаванні нових зображень
  const firstNewFilmRef = useRef();

  useEffect(() => {
    firstNewFilmRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [movies]);

  const changeSearch = (value) => {
    setSearchParams({ name: value });
    setLoaderBtn(false);
    setMovies([]);
    setPage(1);
  };

  const nextPage = () => {
    setLoaderBtn(false);
    setLoading(true);
    setPage(page + 1);
  };

  useEffect(() => {
    async function fetchMovies() {
      if (!inputValue) return;
      try {
        setError(false);
        setLoading(true);
        const data = await searchMovies(inputValue, page);
        if (!data.results.length) {
          toast("На жаль, немає фільмів, які відповідають вашому пошуковому запиту. Будь ласка, спробуйте ще раз!", {
            style: {
              color: "#ffffff",
              backgroundColor: "#FF8C00",
            },
          });
          return;
        }
        setMovies((prevMovies) => {
          return movies.length > 0 ? [...prevMovies, ...data.results] : data.results;
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
  }, [searchParams, page]);

  return (
    <>
      <section className={css.movies}>
        <div className={css.container}>
          <SearchBar onSearch={changeSearch} />
          {loading && <Loader loading={loading} />}
          {error && <ErrorMessage error={error} />}
          {movies.length > 0 && <MovieList ref={firstNewFilmRef} items={movies} />}
          {loaderBtn && <LoadMoreBtn nextPage={nextPage} />}
        </div>
      </section>
      <Toaster position="top-right" containerStyle={{ zIndex: 99999999 }} />
    </>
  );
}
