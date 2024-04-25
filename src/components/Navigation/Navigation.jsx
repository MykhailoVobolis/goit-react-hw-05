import clsx from "clsx";

import { NavLink } from "react-router-dom";

import css from "./Navigation.module.css";

const getNavLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
  return (
    <header className={css.pageHeader}>
      <div className={css.container}>
        <nav className={css.nav}>
          <NavLink to="/" className={getNavLinkClass}>
            ДОДОМУ
          </NavLink>
          <NavLink to="/movies" className={getNavLinkClass}>
            ФІЛЬМИ
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
