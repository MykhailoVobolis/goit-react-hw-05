import Loader from "../../components/Loader/Loader.jsx";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm.jsx";
import { useUser } from "../../userContext.jsx";

import css from "./RegisterPage.module.css";

export default function RegisterPage() {
  const { loading } = useUser();
  return (
    <section className={css.registerPage}>
      {loading && <Loader loading={loading} />}
      <div className={css.container}>
        <RegistrationForm />
      </div>
    </section>
  );
}
