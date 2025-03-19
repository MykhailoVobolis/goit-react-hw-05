import MovieList from "../../components/MovieList/MovieList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import MoviesPagination from "../../components/MoviesPagination/MoviesPagination.jsx";

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getNowPlaying } from "../../tmdb-api";

import css from "./NowPlayingMoviesPage.module.css";

export default function NowPlayingMoviesPage() {
  const [moviesNowPlaying, setMoviesNowPlaying] = useState([]);
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
        const data = await getNowPlaying(page);
        setMoviesNowPlaying(data.results);
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
      <section className={css.nowPlayingMovies}>
        {loading && <Loader loading={loading} />}
        {moviesNowPlaying.length > 0 && (
          <div className={css.container}>
            <h2 className={css.nowPlayingMoviesTitle}>Зараз у кіно</h2>
            <MovieList items={moviesNowPlaying} />
            {paginate && <MoviesPagination page={page} totalPages={totalPages} handlePageChange={handlePageChange} />}
          </div>
        )}
      </section>
      {error && <ErrorMessage error={error} />}
    </>
  );
}
