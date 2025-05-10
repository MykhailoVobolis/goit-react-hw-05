import { IoChevronDown } from "react-icons/io5";
import { useEffect, useState } from "react";

import GenreBarPopover from "../GenreBarPopover/GenreBarPopover.jsx";

import css from "./GenreButton.module.css";

export default function GenreButton({ genres }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Закриття GenreBarPopover при кліку у будь яке місце екрану
  useEffect(() => {
    // Функція, яка викликається при кліку
    function handleClick(event) {
      // Перевіряємо, чи клік був не на кнопці чи її дочірніх елементах
      if (event.target.closest("button")) {
        return;
      }
      setMenuOpen(false);
    }
    // Функція, яка викликається при Escape
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        // Прибирання фокусу з активного елемена
        document.activeElement?.blur();
      }
    }

    // Додаємо обробник подій на документ при завантаженні компонента
    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeyDown);

    // Видаляємо обробник подій при демонтажі компонента
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
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
