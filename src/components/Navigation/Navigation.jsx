import clsx from "clsx";

import { NavLink, Link } from "react-router-dom";
import { RiMovie2Line } from "react-icons/ri";

import { IoIosSearch } from "react-icons/io";

import css from "./Navigation.module.css";

const getNavLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
  return (
    <header className={css.pageHeader}>
      <div className={css.container}>
        <nav className={css.nav}>
          <div className={css.navItemsContainer}>
            <Link to="/">
              <RiMovie2Line className={css.logo} />
            </Link>
            <NavLink to="/" className={getNavLinkClass}>
              Додому
            </NavLink>
            <NavLink to="/movies" className={getNavLinkClass}>
              Фільми
            </NavLink>
          </div>
          <Link to="/search">
            <IoIosSearch className={css.searchIcon} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
