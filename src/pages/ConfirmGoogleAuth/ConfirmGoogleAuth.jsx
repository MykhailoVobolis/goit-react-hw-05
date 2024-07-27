import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useUser } from "../../userContext.jsx";
import { confirmGoogleOAuth } from "../../cinema-server-api.js";
import Loader from "../../components/Loader/Loader.jsx";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";

export default function ConfirmGoogleAuth() {
  const { googleAuthContext } = useUser();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const code = params.get("code");

  useEffect(() => {
    async function googleAuth(code) {
      try {
        setLoading(true);
        const response = await confirmGoogleOAuth(code);
        googleAuthContext(response);
        localStorage.setItem("token", response.accessToken);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    if (code) {
      googleAuth(code);
    }
  }, [location, code]);

  return (
    <div>
      {loading && <Loader loading={loading} />}
      {error && <ErrorMessage error={error} />}
    </div>
  );
}
