import { useParams, useLocation, Outlet, NavLink, Link } from "react-router-dom";
import { getDetailsMovie } from "../../tmdb-api";
import { useState, useEffect } from "react";
import Genre from "../../components/Genre/Genre";
import { AiFillLike } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { FaPlay } from "react-icons/fa";
import { IoCaretBackOutline } from "react-icons/io5";
import css from "./MovieDetailsPage.module.css";

const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

export default function MovieDetailsPage() {
  const { movieId } = useParams();

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [release, setRelease] = useState("");
  const [rating, setRating] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Для повернення на попередню сторінку !!!
  const location = useLocation();
  const backLink = location.state;
  console.log(backLink);
  // const backLink = location.state?.from ?? "/";

  useEffect(() => {
    async function handleClickMovie() {
      try {
        setLoading(true);
        const data = await getDetailsMovie(movieId);
        setMovies(data);
        setGenres(data.genres);
        setRelease(data.release_date.slice(0, 4));
        setRating(Math.round(data.vote_average * 10) / 10);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    handleClickMovie();
  }, [movieId]);

  return (
    <>
      <section>
        <div
          className={css.hero}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movies.backdrop_path})`,
          }}>
          <span className={css.gradientOverlay}></span>
          <button className={css.playBtn} type="button">
            <FaPlay className={css.iconPlay} />
            Офіційний трейлер
          </button>
        </div>
      </section>
      <section className={css.movie}>
        <div className={css.movieContainer}>
          <img
            className={css.poster}
            src={movies.poster_path ? `https://image.tmdb.org/t/p/w500${movies.poster_path}` : defaultImg}
            alt={movies.title}
            width="400px"
            height="600px"
          />
          <div>
            <h1 className={css.title}>{movies.title}</h1>
            <ul className={css.statMovie}>
              <li>
                Дата випуску: <span className={css.accent}>{release} рік</span>
              </li>
              <li>
                Рейтинг: <span className={css.accent}>TMDB {rating}</span>
              </li>
              <li>
                Оцінка глядачів:
                <span className={css.accent}>
                  <AiFillLike className={css.icon} />
                  {movies.vote_count}
                </span>
              </li>
              <li>
                Тривалість:
                <span className={css.accent}>
                  <BiTime className={css.icon} />
                  {movies.runtime} хв.
                </span>
              </li>
            </ul>
            <div className={css.genresContainer}>
              <p>Жанр:</p>
              <ul className={css.genreList}>
                {genres.map((genre) => (
                  <li className={css.genreItem} key={genre.id}>
                    <Genre genre={genre} />
                  </li>
                ))}
              </ul>
            </div>
            <h2 className={css.descriptionMovie}>Опис</h2>
            <p className={css.textMovie}>{movies.overview}</p>
            <Link className={css.linkGoBack} to={backLink}>
              <IoCaretBackOutline /> повернутися
            </Link>
          </div>
        </div>
      </section>
      <section className={css.addInformationSection}>
        <div className={css.addInfoContainer}>
          <h2 className={css.addInformation}>Додаткова інформація</h2>
          <ul className={css.addInformationList}>
            <li>
              <NavLink className={css.informationLink} to="cast">
                АКТОРСЬКИЙ СКЛАД
              </NavLink>
            </li>
            <li>
              <NavLink className={css.informationLink} to="reviews">
                ВІДГУКИ
              </NavLink>
            </li>
          </ul>
        </div>
        <Outlet />
      </section>
    </>
  );
}
