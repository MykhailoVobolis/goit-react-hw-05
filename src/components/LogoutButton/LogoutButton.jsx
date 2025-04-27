import { MdLogout } from "react-icons/md";
import { useMedia } from "react-use";

import css from "./LogoutButton.module.css";

export default function LogoutButton({ logOut, onClose }) {
  const isDesktop = useMedia("(min-width: 1280px)");

  return (
    <button
      className={css.logoutBtn}
      onClick={() => {
        logOut();
        onClose();
      }}>
      {isDesktop && <MdLogout size={24} />}
      Вихід
    </button>
  );
}
