import GenresList from "../GenresList/GenresList.jsx";

import css from "./GenreBarPopover.module.css";

export default function GenreBarPopover({ genres }) {
  return (
    <div className={css.container}>
      <GenresList genres={genres} />
    </div>
  );
}
