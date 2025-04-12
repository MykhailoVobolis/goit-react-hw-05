import clsx from "clsx";
import { NavLink } from "react-router-dom";

import css from "./NavigationList.module.css";

const getNavLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function NavigationList({ isLoggedIn, onClose }) {
  return (
    <div className={css.navListContainer}>
      <NavLink to="/" aria-label="Go to home page" className={getNavLinkClass} onClick={() => onClose()}>
        Головна
      </NavLink>
      <NavLink to="/movies" aria-label="Go to movies page" className={getNavLinkClass} onClick={() => onClose()}>
        Фільми
      </NavLink>
      {isLoggedIn && (
        <NavLink
          to="/watching"
          aria-label="Go to favorite movies page"
          className={getNavLinkClass}
          onClick={() => onClose()}>
          Обране
        </NavLink>
      )}
    </div>
  );
}
