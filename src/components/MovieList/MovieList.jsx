import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

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
