import { Link, useLocation } from "react-router-dom";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper-bundle.css";
import css from "./Slider.module.css";

const defaultImg =
  "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";

export default function Slider({ items }) {
  const location = useLocation();

  // Фільтрація масиву фільмів тільки з наявним бекдропом
  const newArrayFilms = items.filter((i) => i.poster_path);

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={15}
        slidesPerView={2.25}
        touchAngle={30}
        speed={100}
        resistance={false}
        resistanceRatio={0.85}
        preventClicks={true}
        freeMode={true}
        navigation={true}
        breakpoints={{
          // 768: { slidesPerView: 1.15 },
          1280: { slidesPerView: 5, slidesPerGroup: 5, spaceBetween: 20, speed: 900 },
        }}>
        {newArrayFilms.map((item) => (
          <SwiperSlide className={css.movieItem} key={item.id}>
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
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
