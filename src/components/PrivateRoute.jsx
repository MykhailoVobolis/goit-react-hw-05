import { Navigate } from "react-router-dom";
import { useUser } from "../userContext.jsx";

export default function PrivateRoute({ component, redirectTo }) {
  const { isLoggedIn } = useUser();

  return isLoggedIn ? component : <Navigate to={redirectTo} />;
}
