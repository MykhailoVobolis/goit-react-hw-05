import { TbRefresh } from "react-icons/tb";

import css from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ nextPage }) {
  return (
    <button className={css.loadBtn} onClick={() => nextPage()}>
      <TbRefresh className={css.iconBtn} />
      <span className={css.textBtn}>Показати ще</span>
    </button>
  );
}
