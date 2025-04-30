import { Link, useLocation } from "react-router-dom";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useEffect } from "react";

import SwiperNavButton from "../SwiperNavButton/SwiperNavButton.jsx";

import "swiper/swiper-bundle.css";
import css from "./Slider.module.css";

const defaultImg =
  "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";

export default function Slider({ items }) {
  const location = useLocation();

  // Фільтрація масиву фільмів тільки з наявним бекдропом
  const newArrayFilms = items.filter((i) => i.poster_path);

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current && prevRef.current && nextRef.current) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);

  return (
    <div className={css.sliderContainer}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={15}
        slidesPerView={2.25}
        slidesPerGroup={2}
        speed={400}
        touchAngle={30}
        watchOverflow={true}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        resistanceRatio={0.1}
        breakpoints={{
          768: { slidesPerView: 4.25, slidesPerGroup: 4 },
          980: { slidesPerView: 5.25, slidesPerGroup: 5 },
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
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <SwiperNavButton ref={prevRef} direction="prev" />
      <SwiperNavButton ref={nextRef} direction="next" />
    </div>
  );
}
