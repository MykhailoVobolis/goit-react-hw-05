import clsx from "clsx";

import MovieModal from "../../components/MovieModal/MovieModal";
import PlayBtn from "../../components/PlayBtn/PlayBtn";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import SimilarFilms from "../../components/SimilarFilms/SimilarFilms";

import { useParams, useLocation, Outlet, NavLink, Link } from "react-router-dom";
import { useState, useEffect, useRef, Suspense } from "react";
import { AiFillLike } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { IoCaretBackOutline } from "react-icons/io5";
import { getDetailsMovie, getMovieVideo } from "../../tmdb-api";
import { formatDateRelease } from "../../helpers/formatData";
import { FaPlay } from "react-icons/fa6";
import { useMedia } from "react-use";
import defaultBg from "../../img/header.png";

import css from "./MovieDetailsPage.module.css";

const getNavLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const defaultImg =
  "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";

const defaultUrl = "https://www.youtube.com/watch?v=KVZA8xsnC28";

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
        setRelease(data.release_date);
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
    setTrailerUrl("");
    async function handleClickPlayBtn() {
      try {
        setLoading(true);
        const data = await getMovieVideo(movieId);
        {
          data[0] ? setTrailerUrl(data[0].key) : setTrailerUrl(defaultUrl);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
        setError(false);
      }
    }
    handleClickPlayBtn();
  }, [modalIsOpen]);

  const isWide = useMedia("(min-width: 768px)");

  return (
    <div className={css.movieDetailsPage}>
      <section>
        {loading && <Loader loading={loading} />}
        <div
          className={css.hero}
          style={
            movies.backdrop_path
              ? {
                  backgroundImage: `url(https://image.tmdb.org/t/p/original${movies.backdrop_path})`,
                }
              : {
                  backgroundImage: `url(${defaultBg})`,
                }
          }>
          <span className={css.gradientOverlay}></span>
          {isWide && <PlayBtn movieId={movieId} openModal={openModal} />}
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
            <h2 className={css.title}>{movies.title}</h2>
            {!isWide && <PlayBtn movieId={movieId} openModal={openModal} />}
            <div className={css.abautFilmContainer}>
              <ul className={css.statMovie}>
                <li className={css.statItem}>Дата релізу:</li>
                <li className={css.statItem}>Рейтинг:</li>
                <li className={css.statItem}>Оцінка глядачів:</li>
                <li className={css.statItem}>Тривалість:</li>
                <li className={css.statItem}>Жанр:</li>
              </ul>
              <div>
                <ul className={css.statMovie}>
                  <li className={css.statValue}>{formatDateRelease(release)}</li>
                  <li>
                    <span className={css.rating}>TMDB</span>
                    <span className={css.ratingValue}>{rating}</span>
                  </li>
                  <li className={css.statValue}>
                    <AiFillLike className={css.icon} />
                    {movies.vote_count}
                  </li>
                  <li className={css.statValue}>
                    <BiTime className={css.icon} />
                    {movies.runtime} хв.
                  </li>
                </ul>
                <ul className={css.genreList}>
                  {genres.map((genre) => (
                    <li className={css.genreItem} key={genre.id}>
                      {genre.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <h2 className={css.descriptionMovie}>Опис</h2>
            <p className={css.textMovie}>{movies.overview}</p>
            <Link className={css.linkGoBack} to={backLink.current}>
              <IoCaretBackOutline className={css.iconBack} /> повернутися
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
                Акторський склад
              </NavLink>
            </li>
            <li>
              <NavLink to="reviews" className={getNavLinkClass}>
                Відгуки
              </NavLink>
            </li>
          </ul>
        </div>
        <Suspense fallback={<div></div>}>
          <Outlet />
        </Suspense>
      </section>
      <SimilarFilms movieId={movieId} />
      {error && <ErrorMessage error={error} />}
    </div>
  );
}
