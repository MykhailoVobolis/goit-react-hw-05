import { Navigate } from "react-router-dom";
import { useUser } from "../userContext.jsx";

export default function RestrictedRoute({ component }) {
  const { isLoggedIn } = useUser();

  return isLoggedIn ? <Navigate to="/" /> : component;
}
