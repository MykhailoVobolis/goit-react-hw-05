import { IoMdMenu } from "react-icons/io";
import css from "./BurgerButton.module.css";

export default function BurgerButton({ openModal, modalIsOpen }) {
  return (
    <button
      className={css.burgerBtn}
      onClick={openModal}
      aria-hidden={modalIsOpen ? "true" : "false"}
      aria-label="Mobile menu button">
      <IoMdMenu size={27} className={css.burgerIcon} />
    </button>
  );
}
