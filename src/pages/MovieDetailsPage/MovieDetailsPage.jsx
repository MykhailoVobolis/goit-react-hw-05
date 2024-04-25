import clsx from "clsx";

import MovieModal from "../../components/MovieModal/MovieModal";
import PlayBtn from "../../components/PlayBtn/PlayBtn";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";

import { useParams, useLocation, Outlet, NavLink, Link } from "react-router-dom";
import { useState, useEffect, useRef, Suspense } from "react";
import { AiFillLike } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { IoCaretBackOutline } from "react-icons/io5";
import { getDetailsMovie, getMovieVideo } from "../../tmdb-api";
import { FaPlay } from "react-icons/fa6";

import css from "./MovieDetailsPage.module.css";

const getNavLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");

  // Повернення на попередню сторінку
  const location = useLocation();
  // Використання useRef для збереження попереднього значення location.state при рендері компонентів Cast або Review
  const backLink = useRef(location.state);
  // На випадок, коли користувач перейшов по збереженому раніше посиланню фільму в новій вкладці браузера
  useEffect(() => {
    {
      !location.state && (backLink.current = "/");
    }
  }, [movieId]);

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

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    async function handleClickPlayBtn() {
      try {
        setLoading(true);
        const data = await getMovieVideo(movieId);
        setTrailerUrl(data[0].key);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
        setError(false);
      }
    }
    handleClickPlayBtn();
  }, [modalIsOpen]);

  return (
    <>
      <section>
        {loading && <Loader loading={loading} />}
        <div
          className={css.hero}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movies.backdrop_path})`,
          }}>
          <span className={css.gradientOverlay}></span>
          <PlayBtn movieId={movieId} openModal={openModal} />
        </div>
        {modalIsOpen && <MovieModal isOpen={modalIsOpen} onClose={closeModal} trailerUrl={trailerUrl} />}
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
                Рейтинг: <span className={css.rating}>TMDB </span>
                {rating}
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
                    {genre.name}
                  </li>
                ))}
              </ul>
            </div>
            <h2 className={css.descriptionMovie}>Опис</h2>
            <p className={css.textMovie}>{movies.overview}</p>
            <Link className={css.linkGoBack} to={backLink.current}>
              <IoCaretBackOutline /> повернутися
            </Link>
          </div>
        </div>
      </section>
      <section className={css.addInformationSection}>
        <div className={css.addInfoContainer}>
          <h2 className={css.addInformation}>
            Додаткова інформація <FaPlay className={css.iconInfo} />
          </h2>
          <ul className={css.addInformationList}>
            <li>
              <NavLink to="cast" className={getNavLinkClass}>
                АКТОРСЬКИЙ СКЛАД
              </NavLink>
            </li>
            <li>
              <NavLink to="reviews" className={getNavLinkClass}>
                ВІДГУКИ
              </NavLink>
            </li>
          </ul>
        </div>
        <Suspense fallback={<div></div>}>
          <Outlet />
        </Suspense>
      </section>
      {error && <ErrorMessage error={error} />}
    </>
  );
}
