import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm.jsx";
import { useUser } from "../../userContext.jsx";

import css from "./RegisterPage.module.css";

export default function RegisterPage() {
  const { loading, error } = useUser();
  return (
    <section>
      <div className={css.container}>{loading ? <Loader loading={loading} /> : <RegistrationForm />}</div>
      {error && <ErrorMessage error={error} />}
    </section>
  );
}
