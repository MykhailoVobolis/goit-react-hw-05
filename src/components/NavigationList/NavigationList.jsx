import clsx from "clsx";
import { NavLink } from "react-router-dom";

import css from "./NavigationList.module.css";

const getNavLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function NavigationList({ isLoggedIn, onClose }) {
  return (
    <div className={css.navListContainer}>
      <NavLink to="/" className={getNavLinkClass} onClick={() => onClose()}>
        Додому
      </NavLink>
      <NavLink to="/movies" className={getNavLinkClass} onClick={() => onClose()}>
        Фільми
      </NavLink>
      {isLoggedIn && (
        <NavLink to="/watching" className={getNavLinkClass} onClick={() => onClose()}>
          Обране
        </NavLink>
      )}
    </div>
  );
}
