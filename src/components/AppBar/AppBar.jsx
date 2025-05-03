import Navigation from "../Navigation/Navigation";
import UserMenu from "../UserMenu/UserMenu.jsx";
import AuthNav from "../AuthNav/AuthNav.jsx";

import { useUser } from "../../userContext.jsx";
import { useMedia } from "react-use";
import { useEffect, useRef, useState } from "react";

import MenuModal from "../MenuModal/MenuModal.jsx";
import SearchInHeader from "../SearchInHeader/SearchInHeader.jsx";

import css from "./AppBar.module.css";

export default function AppBar() {
  const { isLoggedIn } = useUser();

  const isDesktop = useMedia("(min-width: 1280px)");

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // Стан видимості хедера
  const [lastScrollPosition, setLastScrollPosition] = useState(0); // Остання позиція прокрутки

  const headerRef = useRef(null);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;

      // Висота хедера
      const headerHeight = headerRef.current?.getBoundingClientRect().height || 0;

      if (currentScrollPosition > headerHeight && currentScrollPosition > lastScrollPosition) {
        // Скролл вниз — хедер ховається
        setIsVisible(false);
      } else if (currentScrollPosition < lastScrollPosition) {
        // Скролл вверх — хедер з'являється
        setIsVisible(true);
      }

      setLastScrollPosition(currentScrollPosition);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollPosition]);

  return (
    <header ref={headerRef} className={`${css.header} ${!isVisible ? css.hidden : ""}`}>
      <div className={css.container}>
        <Navigation openModal={openModal} isLoggedIn={isLoggedIn} onClose={closeModal} modalIsOpen={modalIsOpen} />
        {isDesktop && <SearchInHeader />}
        {isDesktop && (isLoggedIn ? <UserMenu onClose={closeModal} /> : <AuthNav onClose={closeModal} />)}
        <MenuModal isOpen={modalIsOpen} onClose={closeModal} />
      </div>
    </header>
  );
}
