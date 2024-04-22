import { useParams } from "react-router-dom";
import { getDetailsMovie } from "../../tmdb-api";
import { useState, useEffect } from "react";
import Genre from "../../components/Genre/Genre";
import { AiFillLike } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { FaPlay } from "react-icons/fa";
import css from "./MovieDetailsPage.module.css";
import { Outlet, NavLink } from "react-router-dom";

export default function MovieDetailsPage() {
  const { movieId } = useParams();

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [release, setRelease] = useState("");
  const [rating, setRating] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
            src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
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
