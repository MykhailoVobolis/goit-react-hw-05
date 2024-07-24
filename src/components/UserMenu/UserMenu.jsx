import { useUser } from "../../userContext.jsx";

import css from "./UserMenu.module.css";

export const UserMenu = () => {
  const { isLoggedIn, username, logOut, logIn } = useUser();

  return (
    <div className={css.authMenu}>
      {isLoggedIn ? (
        <>
          <p>{username}</p>
          <button onClick={logOut}>Вийти</button>
        </>
      ) : (
        <button onClick={logIn}>Увійти</button>
      )}
    </div>
  );
};
