import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div className={css.notFoundContainer}>
      <p className={css.notFoundText}>Вибачте, сторінка на знайдена</p>
    </div>
  );
}
