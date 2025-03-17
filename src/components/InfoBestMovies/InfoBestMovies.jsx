import SvgIcon from "../../SvgIcon.jsx";

import { Link } from "react-router-dom";

import css from "./InfoBestMovies.module.css";

export default function InfoBestMovies() {
  return (
    <div className={css.ibmContainer}>
      <div className={css.container}>
        <h2 className={css.ibmTitle}>Фільми від найкращих кіностудій світу</h2>
        <p className={css.ibmText}>Найкращі культові фільми та мультфільми в HD-якості з українським дубляжем</p>
        <ul className={css.logoList}>
          <li>
            <Link>
              <SvgIcon className={`${css.wbIcon} ${css.companyIcon}`} name="icon-warner" />
            </Link>
          </li>
          <li>
            <Link>
              <SvgIcon className={`${css.paramountIcon} ${css.companyIcon}`} name="icon-paramount" />
            </Link>
          </li>
          <li>
            <Link>
              <SvgIcon className={`${css.dreamWorksIcon} ${css.companyIcon}`} name="icon-dreamworks" />
            </Link>
          </li>
          <li>
            <Link>
              <SvgIcon className={`${css.universalIcon} ${css.companyIcon}`} name="icon-universal" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
