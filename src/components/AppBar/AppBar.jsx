import Navigation from "../Navigation/Navigation";
import UserMenu from "../UserMenu/UserMenu.jsx";
import AuthNav from "../AuthNav/AuthNav.jsx";

import { useUser } from "../../userContext.jsx";

import css from "./AppBar.module.css";

export default function AppBar() {
  const { isLoggedIn } = useUser();

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Navigation />
        {isLoggedIn ? <UserMenu /> : <AuthNav />}
      </div>
    </header>
  );
}
