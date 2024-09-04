import { useUser } from "../../userContext.jsx";
import { useMedia } from "react-use";

import UserAvatar from "../UserAvatar/UserAvatar.jsx";

import css from "./UserMenu.module.css";
import LogoutButton from "../LogoutButton/LogoutButton.jsx";

export default function UserMenu({ onClose }) {
  const { user, logOut } = useUser();

  const isTablet = useMedia("(min-width: 768px)");

  return (
    <div className={css.authMenu}>
      {isTablet && <UserAvatar user={user} />}
      <LogoutButton logOut={logOut} onClose={onClose} />
    </div>
  );
}
