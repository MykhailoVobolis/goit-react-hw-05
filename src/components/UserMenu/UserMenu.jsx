import { useUser } from "../../userContext.jsx";
import { useMedia } from "react-use";

import UserAvatar from "../UserAvatar/UserAvatar.jsx";
import LogoutButton from "../LogoutButton/LogoutButton.jsx";

import css from "./UserMenu.module.css";

export default function UserMenu({ onClose }) {
  const { user, logOut } = useUser();

  const isDesktop = useMedia("(min-width: 1280px)");

  return (
    <div className={css.authMenu}>
      {isDesktop && <UserAvatar user={user} />}
      <LogoutButton logOut={logOut} onClose={onClose} />
    </div>
  );
}
