import { Link, useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";

import "swiper/swiper-bundle.css";
import css from "./SliderMoviesMain.module.css";

export default function SliderMoviesMain({ items }) {
  const location = useLocation();

  // Фільтрація масиву фільмів тільки з наявним бекдропом
  const newArrayFilms = items.filter((i) => i.backdrop_path);
  return (
    <div className={css.sliderContainer}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        autoplay={{ delay: 4000 }}
        spaceBetween={40}
        slidesPerView={1}
        slidesPerGroup={1}
        speed={700}
        loop={true}
        breakpoints={{ 1280: { slidesPerView: 1 }, 1440: { slidesPerView: 1.15 }, 1920: { slidesPerView: 1.48 } }}
        pagination={{ clickable: true }}
        centeredSlides={true}
        initialSlide={0}>
        {newArrayFilms.map((item) => (
          <SwiperSlide className={css.movieItem} key={item.id}>
            <Link to={`/movies/${item.id}`} state={location}>
              <img
                key={item.id}
                className={css.movieImage}
                src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                alt={item.title}
                width="1246px"
                height="356px"
              />
            </Link>
            <div className={css.titleContainer}>
              <p className={css.titleMovies}>{item.title}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
