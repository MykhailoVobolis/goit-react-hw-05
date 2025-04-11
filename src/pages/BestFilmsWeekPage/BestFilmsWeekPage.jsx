import MovieList from "../../components/MovieList/MovieList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";

import { getWeekMovies } from "../../tmdb-api";
import { useQuery } from "@tanstack/react-query";

import css from "./BestFilmsWeekPage.module.css";

export default function BestFilmsWeekPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["weekMovies"],
    queryFn: getWeekMovies,
  });

  const moviesWeek = data || [];

  return (
    <>
      <section className={css.trendMovies}>
        {isLoading && <Loader loading={isLoading} />}
        {moviesWeek.length > 0 && (
          <div className={css.container}>
            <h2 className={css.trendMoviesTitle}>Найкращі фільми тижня</h2>
            <MovieList items={moviesWeek} />
          </div>
        )}
      </section>
      {isError && <ErrorMessage error={isError} />}
    </>
  );
}
