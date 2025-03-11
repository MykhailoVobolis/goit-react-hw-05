import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { getMoviesByGenre } from "../../tmdb-api.js";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import MovieList from "../../components/MovieList/MovieList.jsx";
import MoviesPagination from "../../components/MoviesPagination/MoviesPagination.jsx";

import css from "./MoviesByGenrePage.module.css";

export default function MoviesByGenrePage() {
  const [moviesByGenre, setMoviesByGenre] = useState([]);
  const [genreMovies, setGenreMovies] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [paginate, setPaginate] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const location = useLocation();

  useEffect(() => {
    const genre = location.state?.genre;
    if (genre) {
      setGenreMovies(genre);
    }
  }, [location.state]);

  const id = genreMovies?.id;

  // Функція обробки зміни сторінки
  const handlePageChange = (event, value) => {
    setSearchParams({ page: value });
  };

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        const data = await getMoviesByGenre(id, page);
        setMoviesByGenre(data.results);
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
  }, [id, page]);

  return (
    <>
      <section className={css.moviesByGenre}>
        {loading && <Loader loading={loading} />}
        {moviesByGenre.length > 0 && (
          <div className={css.container}>
            <h2 className={css.moviesByGenreTitle}>{genreMovies?.name}</h2>
            <MovieList items={moviesByGenre} />
            {paginate && <MoviesPagination page={page} totalPages={totalPages} handlePageChange={handlePageChange} />}
          </div>
        )}
      </section>
      {error && <ErrorMessage error={error} />}
    </>
  );
}
