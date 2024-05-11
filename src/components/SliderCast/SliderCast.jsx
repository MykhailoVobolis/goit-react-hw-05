import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper-bundle.css";
import css from "./SliderCast.module.css";

export default function SliderCast({ actors }) {
  return (
    <div className={css.actorsList}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={20}
        slidesPerView={6}
        slidesPerGroup={6}
        speed={900}
        navigation>
        {actors.map((item) => (
          <SwiperSlide className={css.actorCard} key={item.id}>
            <img
              className={css.actorImage}
              src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
              alt={item.name}
              width="191px"
              height="285px"
            />
            <div className={css.nameContainer}>
              <p className={css.actorName}>{item.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
