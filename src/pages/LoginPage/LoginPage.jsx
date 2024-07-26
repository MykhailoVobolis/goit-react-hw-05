import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import LoginForm from "../../components/LoginForm/LoginForm.jsx";
import { useUser } from "../../userContext.jsx";

import css from "./LoginPage.module.css";

export default function LoginPage() {
  const { loading, error } = useUser();
  return (
    <section>
      <div className={css.container}>{loading ? <Loader loading={loading} /> : <LoginForm />}</div>
      {error && <ErrorMessage error={error} />}
    </section>
  );
}
