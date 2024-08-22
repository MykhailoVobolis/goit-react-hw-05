import { Navigate } from "react-router-dom";
import { useUser } from "../userContext.jsx";
import Loader from "./Loader/Loader.jsx";

export default function PrivateRoute({ component, redirectTo }) {
  const { isLoggedIn, authProcess = false } = useUser();

  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    if (authProcess) {
      return <Loader loading={authProcess} />;
    }
  }

  return isLoggedIn ? component : <Navigate to={redirectTo} />;
}
