import { FcGoogle } from "react-icons/fc";

import css from "./GoogleBtn.module.css";
import { getGoogleUrl } from "../../cinema-server-api.js";

export default function GoogleBtn({ type }) {
  const handleGoogleLogin = async () => {
    try {
      const response = await getGoogleUrl();
      const url = response.data.url; // Получаем URL из ответа
      window.location.href = url; // Перенаправляем пользователя на URL для авторизации Google
    } catch (error) {
      console.error("Error getting Google auth URL:", error);
    }
  };

  return (
    <>
      {type === "Up" ? (
        <button className={css.googleBtn} onClick={handleGoogleLogin}>
          <FcGoogle className={css.googleIcon} />
          Реєстрація через Google
        </button>
      ) : (
        <button className={css.googleBtn} onClick={handleGoogleLogin}>
          <FcGoogle className={css.googleIcon} />
          Увійти через Google
        </button>
      )}
    </>
  );
}