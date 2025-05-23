import clsx from "clsx";
import { format } from "date-fns";
import { uk } from "date-fns/locale";

import MovieModal from "../../components/MovieModal/MovieModal";
import PlayBtn from "../../components/PlayBtn/PlayBtn";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import SimilarFilms from "../../components/SimilarFilms/SimilarFilms";
import DelIsFavoriteMovieBtn from "../../components/DelIsFavoriteMovieBtn/DelIsFavoriteMovieBtn.jsx";
import AddIsFavoriteMovieBtn from "../../components/AddIsFavoriteMovieBtn/AddIsFavoriteMovieBtn.jsx";
import GenresOfMovie from "../../components/GenresOfMovie/GenresOfMovie.jsx";
import defaultBg from "../../img/header.png";

import { useUser } from "../../userContext.jsx";
import { useParams, useLocation, Outlet, Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, Suspense } from "react";
import { AiFillLike } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { MdKeyboardBackspace } from "react-icons/md";
import { getDetailsMovie, getMovieVideo } from "../../tmdb-api";
import { addMovie, delMovie, getMovieById } from "../../cinema-server-api.js";
import { useMedia } from "react-use";

import css from "./MovieDetailsPage.module.css";

const getNavLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const defaultImg =
  "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";

const defaultUrl = "https://www.youtube.com/watch?v=KVZA8xsnC28";

export default function MovieDetailsPage() {
  const { isLoggedIn } = useUser();
  const { movieId } = useParams();
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [rating, setRating] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(null);

  const isDesktop = useMedia("(min-width: 1280px)");

  // Повернення на попередню сторінку
  const location = useLocation();
  // Використання useRef для збереження попереднього значення location.state при рендері компонентів Cast або Review
  const backLink = useRef(location.state);
  // На випадок, коли користувач перейшов по збереженому раніше посиланню фільму в новій вкладці браузера
  useEffect(() => {
    if (!location.state) {
      backLink.current = "/";
    }
  }, [location.state]);

  // Логіка автоматичного редіректу на /cast при переході на MovieDetailsPage
  useEffect(() => {
    const currentPath = location.pathname;
    const hasSubRoute = currentPath.endsWith("/cast") || currentPath.endsWith("/reviews");

    if (!hasSubRoute) {
      navigate(`/movies/${movieId}/cast`, { replace: true, state: location.state });
    }
  }, [location.pathname, movieId, navigate, location.state]);

  function handleClikAddMovie() {
    const favoriteMovies = {
      id: movieId,
      poster_path: movies.poster_path,
      title: movies.title,
    };
    async function addFavoriteMovie() {
      try {
        setIsFavorite(true);
        await addMovie(favoriteMovies);
      } catch (error) {
        setError(true);
      }
    }
    addFavoriteMovie();
  }

  function handleClikDelMovie() {
    async function delFavoriteMovie() {
      try {
        setIsFavorite(false);
        await delMovie(movieId);
      } catch (error) {
        setError(true);
      }
    }
    delFavoriteMovie();
  }

  // Виклик фильму за id з MongoDB для всановлення флага що фильм вже є у обраному
  useEffect(() => {
    async function handleClickMovieById() {
      try {
        const data = await getMovieById(movieId);
        if (data) {
          setIsFavorite(true);
        } else {
          setIsFavorite(false);
        }
      } catch (error) {
        setIsFavorite(false);
      }
    }
    if (isLoggedIn) {
      handleClickMovieById();
    }
  }, [isLoggedIn, movieId]);

  useEffect(() => {
    async function handleClickMovie() {
      setLoading(true);
      try {
        const data = await getDetailsMovie(movieId);
        setMovies(data);
        setGenres(data.genres);
        setRating(Math.round(data.vote_average * 10) / 10);

        if (data.backdrop_path) {
          const img = new Image();
          img.src = `https://image.tmdb.org/t/p/original${data.backdrop_path}`;

          img.onload = () => {
            setBackgroundImage(`url(${img.src})`);
          };

          img.onerror = () => {
            setBackgroundImage(`url(${defaultBg})`);
          };
        } else {
          setBackgroundImage(`url(${defaultBg})`);
        }
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
  }, [modalIsOpen, movieId]);

  return loading ? (
    <Loader loading={loading} />
  ) : (
    <div className={css.movieDetailsPage}>
      <section className={css.heroSection}>
        {!isDesktop && backgroundImage && (
          <Link className={css.linkGoBackMobile} to={backLink.current}>
            <MdKeyboardBackspace size={27} />
          </Link>
        )}
        <div
          className={css.hero}
          style={{
            backgroundImage: backgroundImage,
          }}>
          <span className={css.gradientOverlay}></span>
          {backgroundImage && <PlayBtn movieId={movieId} openModal={openModal} />}
        </div>
        {modalIsOpen && <MovieModal isOpen={modalIsOpen} onClose={closeModal} trailerUrl={trailerUrl} />}
      </section>
      <section className={css.movie}>
        <div className={css.movieContainer}>
          {isDesktop && (
            <img
              className={css.poster}
              src={movies.poster_path ? `https://image.tmdb.org/t/p/w500${movies.poster_path}` : defaultImg}
              alt={movies.title}
              width="400px"
              height="600px"
            />
          )}
          <div>
            <div className={css.titleContainer}>
              {isLoggedIn &&
                (isFavorite ? (
                  <DelIsFavoriteMovieBtn handleClick={handleClikDelMovie} />
                ) : (
                  <AddIsFavoriteMovieBtn handleClick={handleClikAddMovie} />
                ))}
              <h1 className={css.title}>{movies.title}</h1>
            </div>
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
                  {movies.release_date && (
                    <li className={css.statValue}>{format(movies.release_date, "dd MMMM yyyy", { locale: uk })}</li>
                  )}
                  <li>
                    <div className={css.ratingContainer}>
                      <span className={css.rating}>TMDB</span>
                      <span className={css.ratingValue}>{rating}</span>
                    </div>
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
                {genres.length > 0 && <GenresOfMovie genres={genres} />}
              </div>
            </div>
            <h2 className={css.descriptionMovie}>Опис</h2>
            <p className={css.textMovie}>{movies.overview}</p>
            {isDesktop && (
              <Link className={css.linkGoBack} to={backLink.current}>
                Повернутися
              </Link>
            )}
          </div>
        </div>
      </section>
      <section className={css.addInformationSection}>
        <div className={css.addInfoContainer}>
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
