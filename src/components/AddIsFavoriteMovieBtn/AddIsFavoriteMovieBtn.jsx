import { GoBookmark } from "react-icons/go";
import { Fab, Tooltip } from "@mui/material";

import css from "./AddIsFavoriteMovieBtn.module.css";

export default function AddIsFavoriteMovieBtn({ handleClick }) {
  return (
    <Tooltip title="Додати до обраного" placement="top-start">
      <button className={css.bookmarkBtn} onClick={handleClick}>
        <GoBookmark className={css.bookmarkIcon} />
      </button>
    </Tooltip>
  );
}
