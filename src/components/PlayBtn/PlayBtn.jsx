import css from "./PlayBtn.module.css";

export default function PlayBtn({ movieId, openModal }) {
  return (
    <button className={css.playBtn} type="button" onClick={() => openModal(movieId)}>
      Офіційний трейлер
    </button>
  );
}
