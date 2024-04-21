import Movie from "../Movie/Movie";
import { Link } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ items }) {
  return (
    <ul className={css.moviesList}>
      {items.map((item) => (
        <li className={css.movieItem} key={item.id}>
          <Link to={`/movies/${item.id}`}>
            <Movie item={item} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
