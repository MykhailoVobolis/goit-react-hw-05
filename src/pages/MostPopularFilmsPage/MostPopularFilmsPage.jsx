import MovieList from "../../components/MovieList/MovieList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import MoviesPagination from "../../components/MoviesPagination/MoviesPagination.jsx";

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getPopularMovies } from "../../tmdb-api";

import css from "./MostPopularFilmsPage.module.css";

export default function MostPopularFilmsPage() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [paginate, setPaginate] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  // Функція обробки зміни сторінки
  const handlePageChange = (event, value) => {
    setSearchParams({ page: value });
  };

  useEffect(() => {
    async function fetchMovies() {
      try {
        setError(false);
        setLoading(true);
        const data = await getPopularMovies(page);
        setPopularMovies(data.results);
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
  }, [page]);

  return (
    <>
      <section className={css.popularMovies}>
        {loading && <Loader loading={loading} />}
        {popularMovies.length > 0 && (
          <div className={css.container}>
            <h2 className={css.popularMoviesTitle}>Найбільш популярні</h2>
            <MovieList items={popularMovies} />
            {paginate && <MoviesPagination page={page} totalPages={totalPages} handlePageChange={handlePageChange} />}
          </div>
        )}
      </section>
      {error && <ErrorMessage error={error} />}
    </>
  );
}
