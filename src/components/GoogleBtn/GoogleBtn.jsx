import { FcGoogle } from "react-icons/fc";

import { getGoogleUrl } from "../../cinema-server-api.js";
import Loader from "../Loader/Loader.jsx";
import { useState } from "react";

import css from "./GoogleBtn.module.css";

export default function GoogleBtn({ type }) {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const response = await getGoogleUrl();
      const url = response.data.url; // Получаем URL из ответа
      window.location.href = url; // Перенаправляем пользователя на URL для авторизации Google
    } catch (error) {
      setLoading(false);
      console.error("Error getting Google auth URL:", error);
    }
  };

  return (
    <>
      {loading && <Loader loading={loading} />}
      {type === "Up" ? (
        <button className={css.googleBtn} onClick={handleGoogleLogin}>
          <FcGoogle className={css.googleIcon} />
          Реєстрація за допомогою Google
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
