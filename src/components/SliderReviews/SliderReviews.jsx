import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import { useEffect, useRef } from "react";

import SwiperNavButton from "../SwiperNavButton/SwiperNavButton.jsx";

import "swiper/swiper-bundle.css";
import css from "./SliderReviews.module.css";

const defaultImg =
  "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg";

export default function SliderReviews({ reviews }) {
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
    <div className={css.reviewsList}>
      <div className={css.sliderContainer}>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={15}
          slidesPerView={1.13}
          slidesPerGroup={1}
          speed={400}
          touchAngle={30}
          watchOverflow={true}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          breakpoints={{
            768: { slidesPerView: 2.13, slidesPerGroup: 2 },
            980: { slidesPerView: 3.15, slidesPerGroup: 3 },
            1280: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 20, speed: 900 },
          }}>
          {reviews.map((item) => (
            <SwiperSlide className={css.reviewItem} key={item.id}>
              <div className={css.authorReviewContainer}>
                <img
                  className={css.authorReviewPhoto}
                  src={
                    item.author_details.avatar_path
                      ? `https://image.tmdb.org/t/p/w500${item.author_details.avatar_path}`
                      : defaultImg
                  }
                  alt={item.author}
                  width="50"
                  height="50"
                  loading="lazy"></img>
                <div className={css.authorDataReview}>
                  <p className={css.authorReviewName}>{item.author}</p>
                  {item.created_at && (
                    <p className={css.dataReview}>{format(item.created_at, "dd MMMM yyyy", { locale: uk })}</p>
                  )}
                </div>
              </div>
              <div className={css.textReviewContainer}>
                <p className={css.textReview}>{item.content}</p>
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
