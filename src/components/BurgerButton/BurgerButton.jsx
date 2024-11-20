import { MdMenu } from "react-icons/md";
import css from "./BurgerButton.module.css";

export default function BurgerButton({ openModal, modalIsOpen }) {
  return (
    <button className={css.burgerBtn} onClick={openModal} aria-hidden={modalIsOpen ? "true" : "false"}>
      <MdMenu size={27} className={css.burgerIcon} />
    </button>
  );
}
