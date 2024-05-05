import { Link, useLocation } from "react-router-dom";
import { forwardRef } from "react";

import css from "./MovieList.module.css";

const defaultImg =
  "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";

const MovieList = forwardRef(({ items }, ref) => {
  const location = useLocation();

  const newFilmIndex = items.length - 20;
  // Функція перевірки співпадіння індексу масиву зображень
  // Повертає true або false
  const isNewFilm = (index) => index === newFilmIndex;

  return (
    <ul className={css.moviesList}>
      {items.map((item, index) => (
        <li className={css.movieItem} key={item.id} ref={isNewFilm(index) ? ref : null}>
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
});

// Обов'язкове додавання відображуваного ім'я у визначені компонента на вимогу eslint
MovieList.displayName = "FilmCollection";

export default MovieList;
