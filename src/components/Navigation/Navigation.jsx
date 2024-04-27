import clsx from "clsx";

import { NavLink, Link } from "react-router-dom";
import { RiMovie2Line } from "react-icons/ri";

import css from "./Navigation.module.css";

const getNavLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
  return (
    <header className={css.pageHeader}>
      <div className={css.container}>
        <nav className={css.nav}>
          <Link to="/" className={getNavLinkClass}>
            <RiMovie2Line className={css.logo} />
          </Link>
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
