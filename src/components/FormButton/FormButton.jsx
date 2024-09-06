import css from "./FormButton.module.css";

export default function FormButton({ children }) {
  return (
    <button className={css.formBtn} type="submit">
      {children}
    </button>
  );
}
