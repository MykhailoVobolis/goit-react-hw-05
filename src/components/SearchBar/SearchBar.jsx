import { Field, Form, Formik } from "formik";
import toast from "react-hot-toast";

import { IoIosSearch } from "react-icons/io";

import css from "./SearchBar.module.css";

export default function SearchBar({ onSearch }) {
  const handleSubmit = (value, actions) => {
    !value.search
      ? toast("Введіть назву фільму!", {
          style: {
            color: "#000000",
            backgroundColor: "#fff088",
          },
        })
      : onSearch(value.search);

    actions.resetForm();
  };

  return (
    <Formik initialValues={{ search: "" }} onSubmit={handleSubmit}>
      <Form className={css.searchForm}>
        <Field className={css.searchInput} autoComplete="off" autoFocus type="text" name="search" placeholder="Пошук" />
        <button className={css.searchBtn} type="submit">
          <IoIosSearch className={css.searchIcon} size={24} />
        </button>
      </Form>
    </Formik>
  );
}
