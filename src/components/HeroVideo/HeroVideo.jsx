import { useEffect, useRef } from "react";

import backgroundVideo from "../../video/cinema-hall-background-video.mp4";
// import backgroundVideo from "../../video/background-video-2.mp4";

import css from "./HeroVideo.module.css";

export default function HeroVideo() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8; // Зменшує швидкість відео
    }
  }, []);

  return (
    <video ref={videoRef} className={css.wrapperVideo} autoPlay loop muted playsInline>
      <source src={backgroundVideo} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
