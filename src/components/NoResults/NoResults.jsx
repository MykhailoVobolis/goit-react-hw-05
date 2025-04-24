import { useMedia } from "react-use";

import css from "./NoResults.module.css";

export default function NoResults() {
  const isTablet = useMedia("(min-width: 768px)");

  return isTablet ? (
    <p className={css.noResultsText}>На жаль, нічого не знайдено. Зміни запит або обирай щось із рекомендованого</p>
  ) : (
    <p className={css.noResultsText}>Нічого не знайдено. Зміни запит</p>
  );
}
