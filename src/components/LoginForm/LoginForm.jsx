import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { Link } from "react-router-dom";
import { useUser } from "../../userContext.jsx";
import { useState } from "react";
import GoogleBtn from "../GoogleBtn/GoogleBtn.jsx";
import FormButton from "../FormButton/FormButton.jsx";
import PassOpenBtn from "../PassOpenBtn/PassOpenBtn.jsx";

import css from "./LoginForm.module.css";

// Валідація полів форми
const regex = {
  // Регулярні вираз для поля форми email
  emailRegexp: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
};

// Об'єкт Yup валідації полів форми
const FeedbackSchema = Yup.object().shape({
  email: Yup.string()
    .min(6, "Електронна пошта має складатись мінімум з 6 символів")
    .max(30, "Електронна пошта має складатись максимум з 30 символів")
    .required("Будь ласка, заповніть поле")
    .matches(regex.emailRegexp, "Будь ласка, введіть коректну адресу електронної пошти"),
  password: Yup.string()
    .min(8, "Пароль має складатись мінімум з 8 символів")
    .max(20, "Пароль має складатись максимум з 20 символів")
    .required("Будь ласка, заповніть поле"),
});

export default function LoginForm() {
  const [isPassOpen, setIsPassOpen] = useState(false);

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

  function handleClick() {
    setIsPassOpen((prev) => !prev);
  }

  return (
    <div className={css.container}>
      <div className={css.mainBox}>
        <div>
          <h2 className={css.title}>Увійти</h2>
          <p className={css.text}>Перейдіть у Cinema Hall</p>
          <GoogleBtn type="In" />
        </div>
        <div>
          <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={FeedbackSchema}>
            {({ errors, touched }) => (
              <Form className={css.form} autoComplete="off">
                <Field
                  className={`${errors.email && touched.email ? css.inputError : css.registerInput}`}
                  label="Email"
                  type="email"
                  name="email"
                  autoComplete="off"
                  required
                  placeholder="Адреса електронної пошти"
                />
                <ErrorMessage className={css.error} name="email" component="span" />
                <div className={css.passInputContainer}>
                  <Field
                    className={`${errors.password && touched.password ? css.inputError : css.registerInput}`}
                    label="Password"
                    type={isPassOpen ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    required
                    placeholder="Пароль"
                  />
                  <PassOpenBtn click={handleClick} isOpen={isPassOpen} />
                </div>
                <ErrorMessage className={css.error} name="password" component="span" />
                <FormButton>Увійти</FormButton>
              </Form>
            )}
          </Formik>
          <p className={css.redirectionText}>
            Уперше на Cinama Hall?{" "}
            <span>
              <Link className={css.redirectionLink} to="/register">
                Зареєструватися
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
