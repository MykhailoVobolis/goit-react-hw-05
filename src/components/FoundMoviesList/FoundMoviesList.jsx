import FoundMovieItem from "../FoundMovieItem/FoundMovieItem.jsx";

import css from "./FoundMoviesList.module.css";

export default function FoundMoviesList({ foundMovies, toggleMenu }) {
  const sortedMovies = foundMovies.sort((a, b) => b.popularity - a.popularity);

  return (
    <ul className={css.moviesList}>
      {sortedMovies.map((movie) => (
        <FoundMovieItem key={movie.id} movie={movie} toggleMenu={toggleMenu} />
      ))}
    </ul>
  );
}
