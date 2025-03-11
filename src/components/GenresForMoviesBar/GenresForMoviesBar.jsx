import GenresList from "../GenresList/GenresList.jsx";

import css from "./GenresForMoviesBar.module.css";

export default function GenresForMoviesBar({ genres }) {
  return (
    <div className={css.wrapper}>
      <GenresList genres={genres} />
    </div>
  );
}
