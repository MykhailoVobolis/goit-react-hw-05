import css from "./ErrorMessage.module.css";

export default function ErrorMessage() {
  return <p className={css.errorMessage}>На жаль, сталася помилка! Спробуйте перезавантажити цю сторінку!</p>;
}
