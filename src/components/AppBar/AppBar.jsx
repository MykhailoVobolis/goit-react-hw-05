import Navigation from "../Navigation/Navigation";
import UserMenu from "../UserMenu/UserMenu.jsx";
import AuthNav from "../AuthNav/AuthNav.jsx";

import { useUser } from "../../userContext.jsx";
import { useMedia } from "react-use";
import { useState } from "react";

import MenuModal from "../MenuModal/MenuModal.jsx";

import css from "./AppBar.module.css";

export default function AppBar() {
  const { isLoggedIn } = useUser();

  const isTablet = useMedia("(min-width: 768px)");

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Navigation openModal={openModal} isLoggedIn={isLoggedIn} onClose={closeModal} modalIsOpen={modalIsOpen} />
        {isTablet && (isLoggedIn ? <UserMenu onClose={closeModal} /> : <AuthNav onClose={closeModal} />)}
        <MenuModal isOpen={modalIsOpen} onClose={closeModal} />
      </div>
    </header>
  );
}
