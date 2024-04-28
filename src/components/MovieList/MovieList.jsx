import { Link, useLocation } from "react-router-dom";

import css from "./MovieList.module.css";

const defaultImg =
  "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";

export default function MovieList({ items }) {
  const location = useLocation();

  return (
    <ul className={css.moviesList}>
      {items.map((item) => (
        <li className={css.movieItem} key={item.id}>
          <Link to={`/movies/${item.id}`} state={location}>
            <div className={css.overlay}>
              <img
                className={css.movieImage}
                src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : defaultImg}
                alt={item.title}
                width="233px"
                height="350px"
              />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
