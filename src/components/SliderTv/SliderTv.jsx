import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, EffectFade } from "swiper/modules";

import "swiper/swiper-bundle.css";
import css from "./SliderTv.module.css";

export default function SliderTv({ items }) {
  // Фільтрація масиву фільмів тільки з наявним бекдропом
  const newArrayFilms = items.filter((i) => i.backdrop_path);
  return (
    <>
      <Swiper
        modules={[A11y, Autoplay, EffectFade]}
        autoplay={{ delay: 3000 }}
        speed={1000}
        loop={true}
        effect={"fade"}
        fadeEffect={{ crossFade: "true" }}>
        {newArrayFilms.map((item) => (
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
