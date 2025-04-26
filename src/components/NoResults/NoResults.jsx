import { useMedia } from "react-use";

import css from "./NoResults.module.css";

export default function NoResults({ mainText, mobileText }) {
  const isTablet = useMedia("(min-width: 768px)");

  return isTablet ? <p className={css.noResultsText}>{mainText}</p> : <p className={css.noResultsText}>{mobileText}</p>;
}
