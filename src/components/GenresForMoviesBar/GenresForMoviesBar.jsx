import GenreButton from "../GenreButton/GenreButton.jsx";
import ShortGenresList from "../ShortGenresList/ShortGenresList";

import css from "./GenresForMoviesBar.module.css";

export default function GenresForMoviesBar({ genres }) {
  return (
    <div className={css.container}>
      <p className={css.title}>Обери фільм на будь-який смак</p>
      <div className={css.wrapper}>
        <GenreButton genres={genres} />
        <ShortGenresList genres={genres} />
      </div>
    </div>
  );
}
