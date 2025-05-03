import { useNavigate } from "react-router-dom";

import css from "./AllResultsBtn.module.css";

export default function AllResultsBtn({ toggleMenu, updateSearchInLocalStorage }) {
  const navigate = useNavigate();

  const handleClick = () => {
    updateSearchInLocalStorage();
    navigate("/search");
    toggleMenu();
  };

  return (
    <button className={css.allResultsBtn} onClick={handleClick}>
      Всі результати
    </button>
  );
}
