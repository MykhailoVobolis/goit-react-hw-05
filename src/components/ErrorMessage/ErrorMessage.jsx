import css from "./ErrorMessage.module.css";

export default function ErrorMessage() {
  return <p className={css.errorMessage}>Whoops, something went wrong! Please try reloading this page!</p>;
}
