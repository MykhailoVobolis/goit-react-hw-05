import { FaPlay } from "react-icons/fa";

import css from "./PlayBtn.module.css";

export default function PlayBtn({ movieId, openModal }) {
  return (
    <button className={css.playBtn} type="button" onClick={() => openModal(movieId)}>
      <FaPlay className={css.iconPlay} /> Офіційний трейлер
    </button>
  );
}
