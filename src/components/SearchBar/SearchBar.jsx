import debounce from "lodash.debounce";

import { useMemo, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { IoCloseCircleOutline } from "react-icons/io5";

import css from "./SearchBar.module.css";

export default function SearchBar({ onSearch }) {
  const [search, setSearch] = useState(() => localStorage.getItem("searchValue") || "");

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
    localStorage.setItem("searchValue", value);
    setSearch(value);
    debouncedSearch(value.trim());
  };

  const handleClick = () => {
    localStorage.removeItem("searchValue");
    setSearch("");
    onSearch("");
  };

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
        <button className={css.clearBtn} onClick={handleClick}>
          <IoCloseCircleOutline size={24} />
        </button>
      )}
    </div>
  );
}
