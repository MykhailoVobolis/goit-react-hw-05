import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import css from "./PaginateBar.module.css";

export default function PaginateBar({ prevPage, nextPage, page, prevDisabled, nextDisabled }) {
  return (
    <div className={css.paginateBar}>
      <button className={css.loadBtn} onClick={() => prevPage()} disabled={prevDisabled}>
        <GrPrevious className={css.iconBtn} />
      </button>
      <div className={css.pageNumber}>{page}</div>
      <button className={css.loadBtn} onClick={() => nextPage()} disabled={nextDisabled}>
        <GrNext className={css.iconBtn} />
      </button>
    </div>
  );
}
