import { Link } from "react-router-dom";

import css from "./Logo.module.css";

export default function Logo() {
  return (
    <Link className={css.mainLogo} to="/" aria-label="Go to home page">
      <span className={css.accent}>movie</span>plex
    </Link>
  );
}
