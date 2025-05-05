import AllResultsBtn from "../AllResultsBtn/AllResultsBtn.jsx";
import FoundMoviesList from "../FoundMoviesList/FoundMoviesList.jsx";
import NoResults from "../NoResults/NoResults.jsx";

import css from "./SearchDropdown.module.css";

export default function SearchDropdown({ foundMovies, toggleMenu, updateSearchInLocalStorage }) {
  return (
    <div className={css.wrapperSearchDropdown}>
      {foundMovies?.length > 0 ? (
        <>
          <p className={css.messageIsFound}>Ми знайшли</p>
          <FoundMoviesList foundMovies={foundMovies} toggleMenu={toggleMenu} />
          <AllResultsBtn toggleMenu={toggleMenu} updateSearchInLocalStorage={updateSearchInLocalStorage} />
        </>
      ) : (
        <NoResults
          mainText={"На жаль, нічого не знайдено. Зміни запит"}
          mobileText={"На жаль, нічого не знайдено. Зміни запит"}
        />
      )}
    </div>
  );
}
