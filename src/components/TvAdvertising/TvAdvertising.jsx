import tvMacup from "../../img/tv-macup.png";
import filmImage from "../../img/film-image.jpg";
import css from "./TvAdvertising.module.css";

export default function TvAdvertising() {
  return (
    <section className={css.tvAdvertising}>
      {/* <div className={css.delimiter}></div> */}
      <div className={css.container}>
        <div className={css.titleContainer}>
          <h2 className={css.title}>Насолоджуйся українським дубляжем</h2>
        </div>
        <div className={css.tvMacupContainer}>
          <img className={css.macup} src={tvMacup} alt="tv macup" width={640} height={480} />
          <img className={css.tvImage} src={filmImage} alt="" width={468} height={264} />
        </div>
      </div>
    </section>
  );
}
