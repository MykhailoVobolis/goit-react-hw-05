import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import css from "./RegistrationForm.module.css";
import { useUser } from "../../userContext.jsx";
import GoogleBtn from "../GoogleBtn/GoogleBtn.jsx";

// Валідація полів форми
const regex = {
  // Регулярні вираз для поля форми email
  emailRegexp: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
};

// Об'єкт Yup валідації полів форми
const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Ім'я має складатись мінімум з 3 символів")
    .max(40, "Ім'я має складатись максимум з 40 символів")
    .required("Необхідно заповнити це поле"),
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

export default function RegistrationForm() {
  // Початкове значення полів форми
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const { register } = useUser();

  const handleSubmit = (value, actions) => {
    register(value);
    actions.resetForm();
  };

  return (
    <div className={css.container}>
      <div className={css.mainBox}>
        <div>
          <h2 className={css.title}>Створіть обліковий запис</h2>
          <p className={css.text}>Введіть своє ім'я та електронну адресу</p>
          <GoogleBtn type="Up" />
        </div>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={FeedbackSchema}>
          <Form className={css.form} autoComplete="off">
            <Field
              className={css.registerInput}
              label="Username"
              type="text"
              name="name"
              autoComplete="off"
              required
              placeholder="Повне ім'я"
            />
            <ErrorMessage className={css.error} name="name" component="span" />
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
              Реєстрація
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
