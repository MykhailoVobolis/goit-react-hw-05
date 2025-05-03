import debounce from "lodash.debounce";

import { useEffect, useMemo, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";

import css from "./SearchBar.module.css";

export default function SearchBar({ onSearch }) {
  const [search, setSearch] = useState(() => localStorage.getItem("searchValue") || "");

  const handleChange = (e) => {
    const value = e.target.value;
    localStorage.setItem("searchValue", value);
    setSearch(value);
    debouncedSearch(value.trim());
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

  const clearSearchInput = () => {
    localStorage.removeItem("searchValue");
    setSearch("");
    onSearch("");
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const newValue = localStorage.getItem("searchValue") || "";
      setSearch(newValue);
    };

    // Слухачі змін у localStorage:
    window.addEventListener("storage", handleStorageChange); // інші вкладки
    window.addEventListener("local-search-updated", handleStorageChange); // поточна вкладка

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("local-search-updated", handleStorageChange);
    };
  }, []);

  return (
    <div className={css.searchContainer}>
      <IoSearchOutline className={css.searchIcon} size={24} />
      <input
        className={css.searchInput}
        type="text"
        value={search}
        onChange={handleChange}
        placeholder="Введіть назву фільму"
      />
      {search && (
        <button className={css.clearBtn} onClick={clearSearchInput}>
          <MdClose size={24} />
        </button>
      )}
    </div>
  );
}
