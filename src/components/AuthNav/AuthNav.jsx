import clsx from "clsx";

import { NavLink } from "react-router-dom";

import css from "./AuthNav.module.css";

const getNavLinkClassLogin = ({ isActive }) => {
  return clsx(css.link, css.linkNav, isActive && css.active);
};

export default function AuthNav({ onClose }) {
  return (
    <NavLink className={getNavLinkClassLogin} to="/login" onClick={() => onClose()}>
      Увійти
    </NavLink>
  );
}
