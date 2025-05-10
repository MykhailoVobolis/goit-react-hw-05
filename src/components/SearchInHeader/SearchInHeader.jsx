import clsx from "clsx";
import debounce from "lodash.debounce";

import { IoSearchOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../tmdb-api.js";

import SearchDropdown from "../SearchDropdown/SearchDropdown.jsx";

import css from "./SearchInHeader.module.css";

export default function SearchInHeader() {
  const [search, setSearch] = useState("");
  const [moviesDropdown, setMoviesDropdown] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isVisibleDropdown, setIsVisibleDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const inputRef = useRef(null);

  const onSearch = useCallback((value) => {
    fetchMovies(value);
  }, []);

  const fetchMovies = async (value) => {
    if (!value || value.length < 2) {
      setMoviesDropdown([]);
      setIsVisibleDropdown(false);
      return;
    }

    try {
      setLoading(true);
      setError(false);
      const data = await searchMovies(value, 1);
      const filteredMovies = data.results.filter((movie) => movie.release_date && movie.title);

      setMoviesDropdown(filteredMovies);
      setIsVisibleDropdown(true);
    } catch (err) {
      setError(true);
      setMoviesDropdown([]);
      setIsVisibleDropdown(true);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        if (value === "") {
          onSearch("");
          return;
        }

        if (value.length < 2) return;
        onSearch(value);
      }, 500),
    [onSearch]
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    debouncedSearch(value.trim());
  };

  const clearSearchInput = () => {
    setSearch("");
    onSearch("");
  };

  const updateSearchInLocalStorage = () => {
    localStorage.setItem("searchValue", search);
    // Створення та відправка події (event) до об'єкта window при зміні значення у localStorage.
    // Це потрібно для того щоб інші компоненти додатка "знали" про зміни у localStorage.
    window.dispatchEvent(new Event("local-search-updated"));
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    inputRef.current?.focus();
    setSearch("");
    setMoviesDropdown([]);
    setIsVisibleDropdown(false);
  };

  // Закриття SearchWrapper при кліку у будь яке місце екрану
  useEffect(() => {
    function handleClick(event) {
      // Перевіряємо, чи клік був не на кнопці чи її дочірніх елементах
      if (event.target.closest("button")) {
        return;
      }
      // Якщо клік всередині пошукового контейнера — ігноруємо
      if (event.target.closest(`.${css.searchContainer}`)) return;
      // Інакше — закриваємо меню
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
    <div className={css.searchWrapper}>
      <div className={clsx(css.searchContainer, menuOpen && css.open)}>
        <IoSearchOutline className={css.searchIcon} size={22} />
        <input
          ref={inputRef}
          className={css.searchInput}
          type="text"
          value={search}
          onChange={handleChange}
          placeholder="Пошук"
        />
        {search && (
          <button className={css.clearBtn} onClick={clearSearchInput}>
            <MdClose size={22} />
          </button>
        )}
        {isVisibleDropdown && (
          <SearchDropdown
            foundMovies={moviesDropdown}
            loading={loading}
            error={error}
            toggleMenu={toggleMenu}
            updateSearchInLocalStorage={updateSearchInLocalStorage}
          />
        )}
      </div>
      <button className={clsx(css.openSearchBtn, menuOpen && css.open)} onClick={toggleMenu}>
        <IoSearchOutline className={css.searchBtnIcon} size={22} />
      </button>
    </div>
  );
}
