import css from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.footerContainer}>
        <p className={css.descriptionFooter}>© CINEMA HALL 2024 v1.0.1. Всі права захищені.</p>
      </div>
    </footer>
  );
}
