import { FcGoogle } from "react-icons/fc";

import { getGoogleUrl } from "../../cinema-server-api.js";
import { storageAccessHelper } from "../../helpers/storageAccessHelper.js";

import css from "./GoogleBtn.module.css";

export default function GoogleBtn({ type }) {
  const handleGoogleLogin = async () => {
    // Запит доступу до збереженого сховища (для Safari)
    await storageAccessHelper();

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
          {/* Реєстрація за допомогою Google */}
          Увійти за допомогою Google
        </button>
      ) : (
        <button className={css.googleBtn} onClick={handleGoogleLogin}>
          <FcGoogle className={css.googleIcon} />
          Увійти за допомогою Google
        </button>
      )}
    </>
  );
}
