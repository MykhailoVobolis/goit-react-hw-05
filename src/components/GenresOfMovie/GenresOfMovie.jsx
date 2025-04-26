import { Link } from "react-router-dom";

import css from "./GenresOfMovie.module.css";

export default function GenresOfMovie({ genres }) {
  return (
    <ul className={css.genreList}>
      {genres.map((item, index) => (
        <li className={css.genreItem} key={item.id}>
          <Link
            to={`/collection/movies_by_genre?genreId=${item.id}&genreName=${encodeURIComponent(item.name)}`}
            state={{ name: item.name }}>
            <p className={css.genreItem}>
              {item.name}
              {index < genres.length - 1 && ","}{" "}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
