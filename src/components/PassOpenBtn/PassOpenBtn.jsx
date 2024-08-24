import { FiEye, FiEyeOff } from "react-icons/fi";

import css from "./PassOpenBtn.module.css";

export default function PassOpenBtn({ click, isOpen }) {
  return (
    <button type="button" className={css.seePassBtn} onClick={click}>
      {isOpen ? (
        <FiEye className={css.iconSeePassBtn} size={20} />
      ) : (
        <FiEyeOff className={css.iconSeePassBtn} size={20} />
      )}
    </button>
  );
}
