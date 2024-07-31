import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import css from "./FavoriteMoviesPage.module.css";

export default function FavoriteMoviesPage() {
  return (
    <>
      <section className={css.favoriteMovies}>
        {/* {loading && <Loader loading={loading} />} */}
        <div className={css.container}>
          <h2 className={css.favoriteMoviesTitle}>Обрані фільми</h2>
          {/* <MovieList items={moviesWeek} /> */}
        </div>
      </section>
      {/* {error && <ErrorMessage error={error} />} */}
    </>
  );
}
