import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useUser } from "../../userContext.jsx";
import { confirmGoogleOAuth } from "../../cinema-server-api.js";
import Loader from "../../components/Loader/Loader.jsx";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";

export default function ConfirmGoogleAuth() {
  const { authContext } = useUser();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
          localStorage.setItem("accessToken", response.accessToken);
        }
      } catch (error) {
        if (!isCancelled) {
          setError(true);
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
      {error && <ErrorMessage error={error} />}
    </div>
  );
}
