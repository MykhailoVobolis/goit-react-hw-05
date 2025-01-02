import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { Link } from "react-router-dom";
import { useUser } from "../../userContext.jsx";
import { useState } from "react";

import { storageAccessHelper } from "../../helpers/storageAccessHelper.js";

import GoogleBtn from "../GoogleBtn/GoogleBtn.jsx";
import FormButton from "../FormButton/FormButton.jsx";
import PassOpenBtn from "../PassOpenBtn/PassOpenBtn.jsx";

import css from "./RegistrationForm.module.css";

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
    .required("Будь ласка, заповніть поле"),
  email: Yup.string()
    .min(6, "Електронна поштам має складатись мінімум з 6 символів")
    .max(30, "Електронна пошта має складатись максимум з 30 символів")
    .required("Будь ласка, заповніть поле")
    .matches(regex.emailRegexp, "Будь ласка, введіть коректну адресу електронної пошти"),
  password: Yup.string()
    .min(8, "Пароль має складатись мінімум з 8 символів")
    .max(20, "Пароль має складатись максимум з 20 символів")
    .required("Будь ласка, заповніть поле"),
});

export default function RegistrationForm() {
  const [isPassOpen, setIsPassOpen] = useState(false);

  // Початкове значення полів форми
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const { register } = useUser();

  const handleSubmit = async (value, actions) => {
    // Виклик requestStorageAccess перед сабмітом форми (дозвіл на запис cookie у Saafri)
    await storageAccessHelper();

    register(value);
    actions.resetForm();
  };

  function handleClick() {
    setIsPassOpen((prev) => !prev);
  }

  return (
    <div className={css.container}>
      <div className={css.mainBox}>
        <div>
          <h2 className={css.title}>Створіть обліковий запис</h2>
          <p className={css.text}>Введіть своє ім'я та електронну адресу</p>
          <GoogleBtn type="Up" />
        </div>
        <div>
          <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={FeedbackSchema}>
            {({ errors, touched }) => (
              <Form className={css.form} autoComplete="off">
                <div className={css.inputGroup}>
                  <Field
                    className={`${errors.name && touched.name ? css.inputError : css.registerInput}`}
                    label="Username"
                    type="text"
                    name="name"
                    autoComplete="off"
                    required
                    placeholder="Повне ім'я"
                  />
                  <ErrorMessage className={css.error} name="name" component="span" />
                </div>
                <div className={css.inputGroup}>
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
                </div>
                <div className={css.inputGroup}>
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
                </div>
                <FormButton>Створити акаунт</FormButton>
              </Form>
            )}
          </Formik>
          <p className={css.redirectionText}>
            Вже зареєстровані на Cinama Hall?{" "}
            <span>
              <Link className={css.redirectionLink} to="/login">
                Увійти
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
