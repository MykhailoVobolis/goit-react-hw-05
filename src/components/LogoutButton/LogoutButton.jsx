import { MdLogout } from "react-icons/md";
import { useMedia } from "react-use";

import css from "./LogoutButton.module.css";

export default function LogoutButton({ logOut, onClose }) {
  const isTablet = useMedia("(min-width: 768px)");

  return (
    <button
      className={css.logoutBtn}
      onClick={() => {
        logOut();
        onClose();
      }}>
      {isTablet && <MdLogout size={24} />}
      Вихід
    </button>
  );
}
