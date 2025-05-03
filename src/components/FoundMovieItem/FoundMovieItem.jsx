import { Link, useLocation } from "react-router-dom";
import { format } from "date-fns";
import { uk } from "date-fns/locale";

import css from "./FoundMovieItem.module.css";

const defaultImg =
  "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";

export default function FoundMovieItem({ movie, toggleMenu }) {
  const location = useLocation();

  const { id, title, poster_path: posterPath, release_date } = movie;

  const releaseDate = format(release_date, "yyyy", { locale: uk });

  return (
    <li className={css.movieItem}>
      <Link to={`/movies/${id}`} state={location} onClick={() => toggleMenu()}>
        <div className={css.cardMovie}>
          <img
            className={css.movieImage}
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${posterPath}` : defaultImg}
            alt={movie.title}
            width="48px"
          />
          <div className={css.movieText}>
            <p className={css.movieTitle}>{title}</p>
            <p className={css.releaseDate}>{releaseDate}</p>
          </div>
        </div>
      </Link>
    </li>
  );
}
