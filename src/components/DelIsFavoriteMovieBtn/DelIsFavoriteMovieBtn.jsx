import { GoBookmarkFill } from "react-icons/go";
import { Tooltip } from "@mui/material";

import css from "./DelIsFavoriteMovieBtn.module.css";

export default function DelIsFavoriteMovieBtn({ handleClick }) {
  return (
    <Tooltip title="Видалити з обраного" placement="top-start">
      <button className={css.delBookmarkBtn} onClick={handleClick}>
        <GoBookmarkFill className={css.bookmarkIcon} />
      </button>
    </Tooltip>
  );
}
