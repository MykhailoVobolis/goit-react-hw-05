import clsx from "clsx";

import GenresList from "../GenresList/GenresList.jsx";

import css from "./GenreBarPopover.module.css";

export default function GenreBarPopover({ genres, isOpen }) {
  return (
    <div className={clsx(css.container, isOpen && css.open)}>
      <div className={css.content}>
        <GenresList genres={genres} />
      </div>
    </div>
  );
}
