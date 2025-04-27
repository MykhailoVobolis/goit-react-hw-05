import { IoChevronDown } from "react-icons/io5";
import { useEffect, useState } from "react";

import css from "./GenreButton.module.css";
import GenreBarPopover from "../GenreBarPopover/GenreBarPopover.jsx";

export default function GenreButton({ genres }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Закриття UserBarPopover при кліку у будь яке місце екрану
  useEffect(() => {
    // Функція, яка викликається при кліку
    function handleClick(event) {
      // Перевіряємо, чи клік був не на кнопці чи її дочірніх елементах
      if (event.target.closest("button")) {
        return;
      }
      // Клік на екран
      setMenuOpen(false);
    }
    // Додаємо обробник подій на документ при завантаженні компонента
    document.addEventListener("click", handleClick);
    // Видаляємо обробник подій при демонтажі компонента
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className={css.genrePanelContainer}>
      <button className={css.choiceGenreBtn} onClick={toggleMenu}>
        <p>Жанри</p>
        <IoChevronDown className={`${css.iconBtn} ${menuOpen ? css.isOpen : ""}`} />
      </button>
      <GenreBarPopover genres={genres} isOpen={menuOpen} />
    </div>
  );
}
