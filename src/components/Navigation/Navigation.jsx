import clsx from "clsx";

import { NavLink, Link } from "react-router-dom";
import { RiMovie2Line } from "react-icons/ri";

import { IoIosSearch } from "react-icons/io";
import { useUser } from "../../userContext.jsx";
import { useMedia } from "react-use";

import BurgerButton from "../BurgerButton/BurgerButton.jsx";
import NavigationList from "../NavigationList/NavigationList.jsx";
import UserAvatar from "../UserAvatar/UserAvatar.jsx";

import css from "./Navigation.module.css";

const getNavLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation({ openModal, isLoggedIn, onClose, modalIsOpen }) {
  const { user } = useUser();

  const isMobile = useMedia("(max-width: 767px)");
  const isTablet = useMedia("(min-width: 768px)");

  return (
    <div className={css.container}>
      <nav className={css.nav}>
        <div className={css.navItemsContainer}>
          <Link to="/" aria-label="Go to home page">
            <RiMovie2Line className={css.logo} />
          </Link>
          {isTablet && <NavigationList isLoggedIn={isLoggedIn} onClose={onClose} />}
        </div>
        <NavLink to="/search" aria-label="Go to search movies page" className={getNavLinkClass}>
          <IoIosSearch className={css.searchIcon} />
        </NavLink>
      </nav>
      <div className={css.userContainer}>
        {isMobile && isLoggedIn && <UserAvatar user={user} />}
        {isMobile && <BurgerButton openModal={openModal} modalIsOpen={modalIsOpen} />}
      </div>
    </div>
  );
}
