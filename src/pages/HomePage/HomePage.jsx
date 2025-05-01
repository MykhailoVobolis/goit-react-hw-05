import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import Slider from "../../components/Slider/Slider";
import TvAdvertising from "../../components/TvAdvertising/TvAdvertising";
import MainRegistrationButton from "../../components/MainRegistrationButton/MainRegistrationButton.jsx";

import { useUser } from "../../userContext.jsx";
import { IoTvOutline, IoLaptopOutline, IoPhonePortraitOutline, IoTabletPortraitOutline } from "react-icons/io5";
import { getWeekMovies } from "../../tmdb-api";
import { Link } from "react-router-dom";
import { GrNext } from "react-icons/gr";
import { useQuery } from "@tanstack/react-query";

import css from "./HomePage.module.css";

export default function HomePage() {
  const { isLoggedIn } = useUser();

  // Використання React Query для отримання фільмів тижня
  const { data, isLoading, isError } = useQuery({
    queryKey: ["weekMovies"],
    queryFn: getWeekMovies,
  });

  const moviesWeek = data || [];

  return (
    <>
      <section>
        <div className={css.hero}>
          <div className={css.heroContainer}>
            <h1 className={css.mainTitle}>
              Світові новинки кіно на <span className={css.lineBreak}>MOVIEPLEX</span>
            </h1>
            <div className={!isLoggedIn ? css.regButtonContainer : css.hidden}>
              <MainRegistrationButton />
            </div>
          </div>
          <div className={css.devicesContainer}>
            <div className={css.deviceTitleContainer}>
              <h2 className={css.deviceTitle}>Дивись на будь-якому пристрої</h2>
              <p className={css.deviceDescription}>
                Дивіться фільми й мультфільми без обмежень на смартфоні, планшеті, ноутбуці й телевізорі.
              </p>
            </div>
            <ul className={css.devicesList}>
              <li className={css.deviceItem}>
                <IoTvOutline className={css.deviceIcon} />
                <p className={css.deviceName}>телевізор</p>
              </li>
              <li className={css.deviceItem}>
                <IoLaptopOutline className={css.deviceIcon} />
                <p className={css.deviceName}>комп`ютер</p>
              </li>
              <li className={css.deviceItem}>
                <IoPhonePortraitOutline className={css.deviceIcon} />
                <p className={css.deviceName}>телефон</p>
              </li>
              <li className={css.deviceItem}>
                <IoTabletPortraitOutline className={css.deviceIcon} />
                <p className={css.deviceName}>планшет</p>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <div className={css.sectionBorder}></div>
      <TvAdvertising movies={moviesWeek} />
      <section className={css.trendMovies}>
        {isLoading && <Loader loading={isLoading} />}
        {moviesWeek.length > 0 && (
          <div className={css.container}>
            <div className={css.titleContainer}>
              <Link className={css.trendMoviesTitle} to={`/collection/best_films_week`} aria-label="Show more movies">
                Найкращі фільми тижня
              </Link>
              <Link className={css.moreLink} to={`/collection/best_films_week`} aria-label="Show more movies">
                Показати більше
              </Link>
              <Link className={css.moreLinkMob} to={`/collection/best_films_week`} aria-label="Show more movies">
                <GrNext className={css.moreIcon} />
              </Link>
            </div>
            <Slider items={moviesWeek} />
          </div>
        )}
      </section>
      {isError && <ErrorMessage error={isError} />}
    </>
  );
}
