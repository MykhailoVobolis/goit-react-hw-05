import { Navigate } from "react-router-dom";
import { useUser } from "../userContext.jsx";

export default function RestrictedRoute({ component, redirectTo }) {
  const { isLoggedIn } = useUser();

  return isLoggedIn ? <Navigate to={redirectTo} /> : component;
}
