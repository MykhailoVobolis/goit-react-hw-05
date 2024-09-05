import { Navigate } from "react-router-dom";
import { useUser } from "../userContext.jsx";
import Loader from "./Loader/Loader.jsx";

export default function PrivateRoute({ component, redirectTo }) {
  const { isLoggedIn, authProcess } = useUser();

  if (authProcess) {
    return <Loader loading={true} />;
  }

  return isLoggedIn ? component : <Navigate to={redirectTo} />;
}
