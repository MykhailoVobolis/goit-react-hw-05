import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay } from "swiper/modules";

import "swiper/swiper-bundle.css";
import css from "./SliderTv.module.css";

export default function SliderTv({ items }) {
  return (
    <>
      <Swiper modules={[A11y, Autoplay]} autoplay={{ delay: 5000 }} speed={900} loop={true}>
        {items.map((item) => (
          <SwiperSlide className={css.movieItem} key={item.id}>
            <div className={css.tvImageContainer}>
              <img
                key={item.id}
                className={css.movieImage}
                src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                alt={item.title}
                width="468px"
                height="264px"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
