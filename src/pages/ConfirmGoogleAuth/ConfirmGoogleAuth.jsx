import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../userContext.jsx";

import { confirmGoogleOAuth } from "../../cinema-server-api.js";

import Loader from "../../components/Loader/Loader.jsx";
import toast, { Toaster } from "react-hot-toast";

export default function ConfirmGoogleAuth() {
  const { authContext } = useUser();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const code = params.get("code");

  useEffect(() => {
    // Флаг для запобігання подвійному запиту через React Strict Mode
    let isCancelled = false;

    async function googleAuth(code) {
      try {
        setLoading(true);
        const response = await confirmGoogleOAuth(code);

        if (!isCancelled) {
          authContext(response);
          localStorage.setItem("wasLoggedIn", true);
          navigate("/"); // Перенаправляємо користувача на головну сторінку
        }
      } catch (error) {
        if (!isCancelled) {
          navigate("/login"); // Перенаправляємо користувача на сторінку входу
          toast(
            "Користувач з такою адресою електронної пошти вже зареєстрований. Будь ласка, увійдіть до Cinema Hall.",
            {
              style: {
                color: "#000000",
                backgroundColor: "#fff088",
              },
            }
          );
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }
    if (code) {
      googleAuth(code);
    }

    return () => {
      isCancelled = true;
    };
  }, [location, code]);

  return (
    <div>
      {loading && <Loader loading={loading} />}
      <Toaster position="top-right" containerStyle={{ zIndex: 99999999 }} />
    </div>
  );
}
