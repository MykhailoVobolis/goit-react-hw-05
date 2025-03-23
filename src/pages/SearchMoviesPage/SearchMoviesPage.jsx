import toast, { Toaster } from "react-hot-toast";

import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import SearchBar from "../../components/SearchBar/SearchBar";
import MoviesPagination from "../../components/MoviesPagination/MoviesPagination.jsx";

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../tmdb-api";

import css from "./SearchMoviesPage.module.css";

export default function SearchMoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [paginate, setPaginate] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const inputValue = searchParams.get("name");
  const page = Number(searchParams.get("page")) || 1;

  const changeSearch = (value) => {
    setSearchParams({ name: value, page: 1 });
    setMovies([]);
    setPaginate(false);
  };

  // Функція обробки зміни сторінки
  const handlePageChange = (event, value) => {
    setSearchParams({ name: inputValue, page: value });
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
              color: "#000000",
              backgroundColor: "#fff088",
            },
          });
          return;
        }
        setMovies(data.results);
        setTotalPages(data.total_pages);
        if (data.total_pages > 1) {
          setPaginate(true);
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
          {movies.length > 0 && <MovieList items={movies} />}
          {paginate && <MoviesPagination page={page} totalPages={totalPages} handlePageChange={handlePageChange} />}
        </div>
      </section>
      <Toaster position="top-right" containerStyle={{ zIndex: 99999999 }} />
    </>
  );
}
