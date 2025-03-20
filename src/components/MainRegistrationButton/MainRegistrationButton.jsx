import { Link } from "react-router-dom";

import css from "./MainRegistrationButton.module.css";

export default function MainRegistrationButton() {
  return (
    <Link className={css.registerLink} to="/register">
      Безкоштовна реєстрація
    </Link>
  );
}
