import css from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.footerContainer}>
        <p className={css.descriptionFooter}>© 2024 CINEMA HALL. v1.0.2. Всі права захищені.</p>
      </div>
    </footer>
  );
}
