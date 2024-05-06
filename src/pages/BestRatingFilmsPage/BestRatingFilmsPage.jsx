import toast, { Toaster } from "react-hot-toast";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const nextPage = () => {
    if (page < totalPages) {
      setLoading(true);
      setSearchParams({ page: page + 1 });
      setPaginate(true);
    }
  };

  const prevPage = () => {
    if (page !== 1) {
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
          //  Повідомлення про досягнення кінця результатів запиту
          toast("Вибачте, але ви досягли кінця результатів пошуку.", {
            style: {
              color: "#ffffff",
              backgroundColor: "#0099FF",
            },
          });
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
            {paginate && <PaginateBar prevPage={prevPage} nextPage={nextPage} page={page} />}
          </div>
        )}
      </section>
      {error && <ErrorMessage error={error} />}
      <Toaster position="top-right" containerStyle={{ zIndex: 99999999 }} />
    </>
  );
}
