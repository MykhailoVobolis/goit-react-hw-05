import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import css from "./LoginForm.module.css";
import { useUser } from "../../userContext.jsx";
import GoogleBtn from "../GoogleBtn/GoogleBtn.jsx";

// Валідація полів форми
const regex = {
  // Регулярні вираз для поля форми email
  emailRegexp: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
};

// Об'єкт Yup валідації полів форми
const FeedbackSchema = Yup.object().shape({
  email: Yup.string()
    .min(6, "e-mail має складатись мінімум з 6 символів")
    .max(30, "e-mail має складатись максимум з 30 символів")
    .required("Необхідно заповнити це поле")
    .matches(regex.emailRegexp, "Не вірний формат e-mail: example@mail.com"),
  password: Yup.string()
    .min(8, "Пароль має складатись мінімум з 8 символів")
    .max(20, "Пароль має складатись максимум з 20 символів")
    .required("Необхідно заповнити це поле"),
});

export default function LoginForm() {
  // Початкове значення полів форми
  const initialValues = {
    email: "",
    password: "",
  };

  const { logIn } = useUser();

  const handleSubmit = (value, actions) => {
    logIn(value);
    actions.resetForm();
  };

  return (
    <div className={css.container}>
      <div className={css.mainBox}>
        <div>
          <h2 className={css.title}>Увійти</h2>
          <p className={css.text}>Перейдіть у Cinema Hall</p>
          <GoogleBtn type="In" />
        </div>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={FeedbackSchema}>
          <Form className={css.form} autoComplete="off">
            <Field
              className={css.registerInput}
              label="Email"
              type="email"
              name="email"
              autoComplete="off"
              required
              placeholder="Адреса електронної пошти"
            />
            <ErrorMessage className={css.error} name="email" component="span" />
            <Field
              className={css.registerInput}
              label="Password"
              type="password"
              name="password"
              autoComplete="current-password"
              required
              placeholder="Пароль"
            />
            <ErrorMessage className={css.error} name="password" component="span" />
            <button className={css.registerBtn} type="submit">
              Увійти
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
