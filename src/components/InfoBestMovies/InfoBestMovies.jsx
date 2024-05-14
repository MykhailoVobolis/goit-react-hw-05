import wb from "../../img/wb.png";
import paramount from "../../img/paramount.png";
import dreamWorks from "../../img/dw.png";
import twentyCentury from "../../img/twentyCentury.png";

import css from "./InfoBestMovies.module.css";

export default function InfoBestMovies() {
  return (
    <div className={css.ibmContainer}>
      <div className={css.container}>
        <h2 className={css.ibmTitle}>Фільми від найкращих кіностудій світу</h2>
        <p className={css.ibmText}>Найкращі культові фільми та мультфільми в HD-якості з українським дубляжем</p>
        <ul className={css.logoList}>
          <li>
            <img src={wb} alt="worner browsers" width={83} height={80} />
          </li>
          <li>
            <img src={paramount} alt="paramount" width={89} height={80} />
          </li>
          <li>
            <img src={dreamWorks} alt="dream works" width={107} height={80} />
          </li>
          <li>
            <img src={twentyCentury} alt="twenty century" width={102} height={80} />
          </li>
        </ul>
      </div>
    </div>
  );
}
