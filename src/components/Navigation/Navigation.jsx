import clsx from "clsx";

import { NavLink } from "react-router-dom";

import { IoSearchOutline } from "react-icons/io5";
import { useUser } from "../../userContext.jsx";
import { useMedia } from "react-use";

import BurgerButton from "../BurgerButton/BurgerButton.jsx";
import NavigationList from "../NavigationList/NavigationList.jsx";
import UserAvatar from "../UserAvatar/UserAvatar.jsx";
import Logo from "../Logo/Logo.jsx";

import css from "./Navigation.module.css";

const getNavLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation({ openModal, isLoggedIn, onClose, modalIsOpen }) {
  const { user } = useUser();

  const isMobile = useMedia("(max-width: 1279px)");
  const isDesktop = useMedia("(min-width: 1280px)");

  return (
    <div className={css.container}>
      <nav className={css.nav}>
        <div className={clsx(css.navItemsContainer, { [css.loggedIn]: isLoggedIn })}>
          <Logo />
          {isDesktop && <NavigationList isLoggedIn={isLoggedIn} onClose={onClose} />}
        </div>
        {isDesktop && (
          <NavLink to="/search" aria-label="Go to search movies page" className={getNavLinkClass}>
            <IoSearchOutline className={css.searchIcon} />
          </NavLink>
        )}
      </nav>
      <div className={css.userContainer}>
        {isMobile && isLoggedIn && <UserAvatar user={user} />}
        {isMobile && <BurgerButton openModal={openModal} modalIsOpen={modalIsOpen} />}
      </div>
    </div>
  );
}
