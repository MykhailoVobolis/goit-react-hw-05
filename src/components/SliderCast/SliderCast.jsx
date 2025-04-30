import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";

import SwiperNavButton from "../SwiperNavButton/SwiperNavButton.jsx";

import "swiper/swiper-bundle.css";
import css from "./SliderCast.module.css";

export default function SliderCast({ actors }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className={css.actorsList}>
      <div className={css.sliderContainer}>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={15}
          slidesPerView={2.25}
          slidesPerGroup={2}
          speed={500}
          touchAngle={30}
          watchOverflow={true}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          breakpoints={{
            768: { slidesPerView: 4.25, slidesPerGroup: 4 },
            980: { slidesPerView: 5.25, slidesPerGroup: 5 },
            1280: { slidesPerView: 6, slidesPerGroup: 6, spaceBetween: 20, speed: 900 },
          }}>
          {actors.map((item) => (
            <SwiperSlide className={css.actorCard} key={item.id}>
              <img
                className={css.actorImage}
                src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                alt={item.name}
                width="191px"
              />
              <div className={css.nameContainer}>
                <p className={css.actorName}>{item.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <SwiperNavButton ref={prevRef} direction="prev" />
        <SwiperNavButton ref={nextRef} direction="next" />
      </div>
    </div>
  );
}
