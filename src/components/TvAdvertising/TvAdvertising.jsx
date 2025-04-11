import tvMacup from "../../img/tv-macup.png";
import SliderTv from "../SliderTv/SliderTv";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";

import { getNowPlaying } from "../../tmdb-api";
import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";

import css from "./TvAdvertising.module.css";

export default function TvAdvertising() {
  const [isVisible, setIsVisible] = useState(false);

  const sectionRef = useRef(null);

  const page = 1;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["nowPlayingMovies"],
    queryFn: () => getNowPlaying(page),
  });

  const moviesNowPlaying = data?.results || [];

  // Анімація заголовку секції
  useEffect(() => {
    const currentRef = sectionRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.25 } // Секція має бути видима на 25%
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section className={css.tvAdvertising} ref={sectionRef}>
      {isLoading && <Loader loading={isLoading} />}
      <div className={css.container}>
        <div className={`${css.titleContainer} ${isVisible ? css.visible : ""}`}>
          <h2 className={css.title}>Насолоджуйся українським дубляжем</h2>
        </div>
        <div className={css.tvMacupContainer}>
          <img className={css.macup} src={tvMacup} alt="tv macup" width={640} height={480} />
          <SliderTv items={moviesNowPlaying} />
        </div>
      </div>
      {isError && <ErrorMessage error={isError} />}
    </section>
  );
}
