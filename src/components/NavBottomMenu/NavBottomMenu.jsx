import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { useUser } from "../../userContext.jsx";
import { IoHomeOutline } from "react-icons/io5";
import { RiMovie2Line } from "react-icons/ri";
import { FaRegStar } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { MdLogin } from "react-icons/md";

import LogoutButton from "../LogoutButton/LogoutButton.jsx";

import css from "./NavBottomMenu.module.css";

const getNavLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function NavBottomMenu() {
  const { isLoggedIn } = useUser();

  return (
    <div className={css.container}>
      <nav className={css.navBottom}>
        <NavLink to="/" aria-label="Go to home page" className={getNavLinkClass}>
          <IoHomeOutline size={24} />
          <span className={css.linkName}>Головна</span>
        </NavLink>
        <NavLink to="/movies" aria-label="Go to movies page" className={getNavLinkClass}>
          <RiMovie2Line size={24} />
          <span className={css.linkName}>Фільми</span>
        </NavLink>
        {isLoggedIn && (
          <NavLink to="/watching" aria-label="Go to favorite movies page" className={getNavLinkClass}>
            <FaRegStar size={24} />
            <span className={css.linkName}>Обране</span>
          </NavLink>
        )}
        <NavLink to="/search" aria-label="Go to search movies page" className={getNavLinkClass}>
          <IoSearchOutline size={24} />
          <span className={css.linkName}>Пошук</span>
        </NavLink>
        {!isLoggedIn && (
          <NavLink to="/login" aria-label="Go to login page" className={getNavLinkClass}>
            <MdLogin size={24} />
            <span className={css.linkName}> Увійти</span>
          </NavLink>
        )}
      </nav>
    </div>
  );
}
