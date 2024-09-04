import { MdLogout } from "react-icons/md";
import css from "./LogoutButton.module.css";

export default function LogoutButton({ logOut, onClose }) {
  console.log(logOut);

  return (
    <button
      className={css.logoutBtn}
      onClick={() => {
        logOut();
        onClose();
      }}>
      <MdLogout size={24} />
      Вихід
    </button>
  );
}
