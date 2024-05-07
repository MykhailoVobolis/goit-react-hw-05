import MovieList from "../../components/MovieList/MovieList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import PaginateBar from "../../components/PaginateBar/PaginateBar";

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getMostRatingMovies } from "../../tmdb-api";

import css from "./BestRatingFilmsPage.module.css";

export default function BestRatingFilmsPage() {
  const [mostRatingMovies, setMostRatingMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [paginate, setPaginate] = useState(false);
  const [prevDisabled, setPrevDisabled] = useState(false);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const nextPage = () => {
    if (page < totalPages) {
      setPrevDisabled(false);
      setLoading(true);
      setSearchParams({ page: page + 1 });
      setPaginate(true);
    }
  };

  const prevPage = () => {
    if (page !== 1) {
      setNextDisabled(false);
      setLoading(true);
      setSearchParams({ page: page - 1 });
    }
  };

  useEffect(() => {
    setMostRatingMovies([]);
    async function fetchMovies() {
      try {
        setError(false);
        setLoading(true);
        const data = await getMostRatingMovies(page);
        setMostRatingMovies((prevMostRatingMovies) => {
          return mostRatingMovies.length > 0 ? [...prevMostRatingMovies, ...data.results] : data.results;
        });
        setTotalPages(data.total_pages);
        if (data.total_pages > 1) {
          setPaginate(true);
        }
        // Перевірка, чи це остання завантажена сторінка?
        if (page === data.total_pages) {
          setNextDisabled(true);
        }
        // Перевірка, чи це перша завантажена сторінка?
        if (page === 1) {
          setPrevDisabled(true);
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
      <section className={css.bestMovies}>
        {loading && <Loader loading={loading} />}
        {mostRatingMovies.length > 0 && (
          <div className={css.container}>
            <h2 className={css.bestMoviesTitle}>Найкраще за рейтингом TMDB</h2>
            <MovieList items={mostRatingMovies} />
            {paginate && (
              <PaginateBar
                prevPage={prevPage}
                nextPage={nextPage}
                page={page}
                prevDisabled={prevDisabled}
                nextDisabled={nextDisabled}
              />
            )}
          </div>
        )}
      </section>
      {error && <ErrorMessage error={error} />}
    </>
  );
}
