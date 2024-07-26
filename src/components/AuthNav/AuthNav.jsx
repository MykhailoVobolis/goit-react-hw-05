import clsx from "clsx";

import { NavLink } from "react-router-dom";
import css from "./AuthNav.module.css";

const getNavLinkClass = ({ isActive }) => {
  return clsx(css.link, css.linkNav, css.marker, isActive && css.active);
};

const getNavLinkClassLogin = ({ isActive }) => {
  return clsx(css.link, css.linkNav, isActive && css.active);
};

export default function AuthNav() {
  return (
    <div className={css.authContainer}>
      <NavLink className={getNavLinkClass} to="/register">
        Реєстрація
      </NavLink>
      <NavLink className={getNavLinkClassLogin} to="/login">
        Вхід
      </NavLink>
    </div>
  );
}
