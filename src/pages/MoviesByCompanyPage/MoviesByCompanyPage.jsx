import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getMoviesByCompany } from "../../tmdb-api.js";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import MovieList from "../../components/MovieList/MovieList.jsx";
import MoviesPagination from "../../components/MoviesPagination/MoviesPagination.jsx";

import css from "./MoviesByCompanyPage.module.css";

export default function MoviesByCompanyPage() {
  const [moviesByCompany, setMoviesByCompany] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [paginate, setPaginate] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const companyId = searchParams.get("companyId");
  const companyName = decodeURIComponent(searchParams.get("companyName"));

  // Функція обробки зміни сторінки
  const handlePageChange = (event, value) => {
    // Додавання значення page до попередніх значень SearchParams
    setSearchParams((prev) => ({ ...Object.fromEntries(prev), page: value }));
  };

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        const data = await getMoviesByCompany(companyId, page);
        setMoviesByCompany(data.results);
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
  }, [companyId, page]);

  return (
    <>
      <section className={css.moviesByCompany}>
        {loading && <Loader loading={loading} />}
        {moviesByCompany.length > 0 && (
          <div className={css.container}>
            <h2 className={css.moviesByCompanyTitle}>{companyName}</h2>
            <MovieList items={moviesByCompany} />
            {paginate && <MoviesPagination page={page} totalPages={totalPages} handlePageChange={handlePageChange} />}
          </div>
        )}
      </section>
      {error && <ErrorMessage error={error} />}
    </>
  );
}
