import { Link } from "react-router-dom";

import css from "./GenresList.module.css";

export default function GenresList({ genres }) {
  return (
    <ul className={css.genresList}>
      {genres.map((item) => (
        <li key={item.id}>
          <Link to={`/collection/movies_by_genre`} state={{ genre: item }}>
            <p className={css.genreItem}>{item.name}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
