import css from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.footerContainer}>
        <p className={css.descriptionFooter}>© 2024-2025 CINEMA HALL. v3.1.4. Всі права захищені.</p>
      </div>
    </footer>
  );
}
