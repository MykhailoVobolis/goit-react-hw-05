import ShortGenresList from "../ShortGenresList/ShortGenresList";

import css from "./GenresForMoviesBar.module.css";

export default function GenresForMoviesBar({ genres }) {
  return (
    <div className={css.container}>
      <h2 className={css.title}>Обери фільм на будь-який смак</h2>
      <ShortGenresList genres={genres} />
    </div>
  );
}
