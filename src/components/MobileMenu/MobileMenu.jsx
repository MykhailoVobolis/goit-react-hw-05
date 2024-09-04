import { MdClose } from "react-icons/md";
import AuthNav from "../AuthNav/AuthNav.jsx";
import NavigationList from "../NavigationList/NavigationList.jsx";
import UserMenu from "../UserMenu/UserMenu.jsx";

import { useUser } from "../../userContext.jsx";

import css from "./MobileMenu.module.css";

export default function MobileMenu({ onClose }) {
  const { isLoggedIn } = useUser();

  return (
    <div className={css.mobileMenu}>
      <button className={css.closeBtn} onClick={() => onClose()}>
        <MdClose size={27} className={css.closeIcon} />
      </button>
      <NavigationList isLoggedIn={isLoggedIn} onClose={onClose} />
      {isLoggedIn ? <UserMenu onClose={onClose} /> : <AuthNav onClose={onClose} />}
    </div>
  );
}
