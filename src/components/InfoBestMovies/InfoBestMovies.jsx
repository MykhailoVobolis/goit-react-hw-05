import SvgIcon from "../../SvgIcon.jsx";

import { Link } from "react-router-dom";

import css from "./InfoBestMovies.module.css";

export default function InfoBestMovies() {
  const filmCompanies = [
    { id: 174, logo_path: "/famoQxsF9T7bDspYcFAfEcv2o3z.png", name: "Warner Bros. Pictures" },
    { id: 4, logo_path: "/gz66EfNoYPqHTYI4q9UEN4CbHRc.png", name: "Paramount Pictures" },
    { id: 7, logo_path: "/vru2SssLX3FPhnKZGtYw00pVIS9.png", name: "DreamWorks Pictures" },
    { id: 33, logo_path: "/3wwjVpkZtnog6lSKzWDjvw2Yi00.png", name: "Universal Pictures" },
  ];

  return (
    <div className={css.ibmContainer}>
      <div className={css.container}>
        <h2 className={css.ibmTitle}>Фільми від найкращих кіностудій світу</h2>
        <p className={css.ibmText}>Найкращі культові фільми та мультфільми в HD-якості з українським дубляжем</p>
        <ul className={css.logoList}>
          <li>
            <Link
              to={`/collection/movies_by_company?companyId=${filmCompanies[0].id}&companyName=${encodeURIComponent(
                filmCompanies[0].name
              )}`}>
              <SvgIcon className={`${css.wbIcon} ${css.companyIcon}`} name="icon-warner" />
            </Link>
          </li>
          <li>
            <Link
              to={`/collection/movies_by_company?companyId=${filmCompanies[1].id}&companyName=${encodeURIComponent(
                filmCompanies[1].name
              )}`}>
              <SvgIcon className={`${css.paramountIcon} ${css.companyIcon}`} name="icon-paramount" />
            </Link>
          </li>
          <li>
            <Link
              to={`/collection/movies_by_company?companyId=${filmCompanies[2].id}&companyName=${encodeURIComponent(
                filmCompanies[2].name
              )}`}>
              <SvgIcon className={`${css.dreamWorksIcon} ${css.companyIcon}`} name="icon-dreamworks" />
            </Link>
          </li>
          <li>
            <Link
              to={`/collection/movies_by_company?companyId=${filmCompanies[3].id}&companyName=${encodeURIComponent(
                filmCompanies[3].name
              )}`}>
              <SvgIcon className={`${css.universalIcon} ${css.companyIcon}`} name="icon-universal" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
