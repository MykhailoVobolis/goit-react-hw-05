import ShortGenresList from "../ShortGenresList/ShortGenresList";

import css from "./GenresForMoviesBar.module.css";

export default function GenresForMoviesBar({ genres, description }) {
  return (
    <div className={css.container}>
      <h2 className={css.title}>{description}</h2>
      <ShortGenresList genres={genres} />
    </div>
  );
}
