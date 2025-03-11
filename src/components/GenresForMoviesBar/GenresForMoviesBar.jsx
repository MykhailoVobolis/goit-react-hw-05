import GenreButton from "../GenreButton/GenreButton.jsx";

import css from "./GenresForMoviesBar.module.css";

export default function GenresForMoviesBar({ genres }) {
  return (
    <div className={css.wrapper}>
      <GenreButton genres={genres} />
    </div>
  );
}
