import { MdMenu } from "react-icons/md";
import css from "./BurgerButton.module.css";

export default function BurgerButton({ openModal }) {
  return (
    <button className={css.burgerBtn}>
      <MdMenu size={27} className={css.burgerIcon} onClick={() => openModal()} />
    </button>
  );
}
