import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import css from "./PaginateBar.module.css";

export default function PaginateBar({ prevPage, nextPage, page }) {
  return (
    <div className={css.paginateBar}>
      <button className={css.loadBtn} onClick={() => prevPage()}>
        <GrPrevious className={css.iconBtn} />
      </button>
      <div className={css.pageNumber}>{page}</div>
      <button className={css.loadBtn} onClick={() => nextPage()}>
        <GrNext className={css.iconBtn} />
      </button>
    </div>
  );
}
