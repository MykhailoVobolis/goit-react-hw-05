import MovieList from "../../components/MovieList/MovieList";
import Spinner from "../../components/Spinner/Spinner.jsx";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import SearchBar from "../../components/SearchBar/SearchBar";
import MoviesPagination from "../../components/MoviesPagination/MoviesPagination.jsx";
import NoResults from "../../components/NoResults/NoResults.jsx";
import GenresForMoviesBar from "../../components/GenresForMoviesBar/GenresForMoviesBar.jsx";

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getGenresMovies, searchMovies } from "../../tmdb-api";

import css from "./SearchMoviesPage.module.css";

export default function SearchMoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [paginate, setPaginate] = useState(false);
  const [genresMovies, setGenresMovies] = useState([]);
  const [moviesFetched, setMoviesFetched] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const inputValue = searchParams.get("name");
  const page = Number(searchParams.get("page")) || 1;

  const changeSearch = (value) => {
    setLoading(true);
    setSearchParams({ name: value, page: 1 });
    setMovies([]);
    setPaginate(false);
  };

  useEffect(() => {
    if (!inputValue) {
      setLoading(false);
    }
  }, [inputValue]);

  useEffect(() => {
    const saved = localStorage.getItem("searchValue")?.trim();
    const currentPage = Number(searchParams.get("page")) || 1;

    if (!searchParams.get("name") && saved && saved.length >= 2) {
      changeSearch(saved, currentPage);
    }
  }, [searchParams]);

  // Функція обробки зміни сторінки
  const handlePageChange = (event, value) => {
    setSearchParams({ name: inputValue, page: value });
  };

  useEffect(() => {
    async function fetchMovies() {
      if (!inputValue) return;
      setMoviesFetched(false);
      try {
        setLoading(true);
        setError(false);
        const data = await searchMovies(inputValue, page);
        setMovies(data.results);
        setTotalPages(data.total_pages);
        if (data.total_pages > 1) {
          setPaginate(true);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
        setMoviesFetched(true);
      }
    }
    fetchMovies();
  }, [inputValue, page]);

  useEffect(() => {
    const shouldLoadGenres = moviesFetched && !loading && movies.length === 0 && genresMovies.length === 0;

    if (!shouldLoadGenres) return;

    async function fetchGenres() {
      try {
        const data = await getGenresMovies();
        setGenresMovies(data.genres);
      } catch (error) {
        setError(true);
      }
    }

    fetchGenres();
  }, [moviesFetched, loading, movies, genresMovies]);

  return (
    <>
      <section className={css.movies}>
        <div className={css.container}>
          <SearchBar onSearch={changeSearch} movies={movies} />
          {loading ? (
            <div className={css.spinnerContainer}>
              <Spinner loading={loading} />
            </div>
          ) : (
            <>
              {error && <ErrorMessage error={error} />}
              {movies.length > 0 && <MovieList items={movies} />}
              {!loading && movies.length === 0 && inputValue && (
                <NoResults
                  mainText={"На жаль, нічого не знайдено. Зміни запит або обирай щось із рекомендованого"}
                  mobileText={"На жаль, нічого не знайдено. Зміни запит"}
                />
              )}
              {paginate && <MoviesPagination page={page} totalPages={totalPages} handlePageChange={handlePageChange} />}
            </>
          )}
        </div>
        {!movies.length > 0 && !loading && <GenresForMoviesBar genres={genresMovies} description="Популярні жанри" />}
      </section>
    </>
  );
}
