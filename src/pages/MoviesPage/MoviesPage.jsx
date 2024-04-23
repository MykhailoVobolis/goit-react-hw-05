import { Field, Form, Formik } from "formik";
import { IoIosSearch } from "react-icons/io";
import css from "./MoviesPage.module.css";
import toast from "react-hot-toast";
import { searchMovies } from "../../tmdb-api";
import { useState, useEffect } from "react";
import MovieList from "../../components/MovieList/MovieList";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onSearch = (value) => {
    setMovies([]);
    setInputValue(value);
  };

  const handleSubmit = (value, actions) => {
    !value.search
      ? toast("Please enter search term!", {
          style: {
            color: "#ffffff",
            backgroundColor: "#FF8C00",
          },
        })
      : onSearch(value.search);

    actions.resetForm();
  };

  useEffect(() => {
    async function fetchMovies() {
      if (inputValue === "") return;
      try {
        setError(false);
        setLoading(true);
        const data = await searchMovies(inputValue);
        if (!data.length) {
          toast("Sorry, there are no movies matching your search query. Please try again!", {
            style: {
              color: "#ffffff",
              backgroundColor: "#ef4040",
            },
          });
          return;
        }
        setMovies((prevMovies) => {
          return movies.length > 0 ? [...prevMovies, ...data] : data;
        });
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, [inputValue]);

  return (
    <>
      <section className={css.movies}>
        <div className={css.container}>
          <Formik initialValues={{ search: "" }} onSubmit={handleSubmit}>
            <Form className={css.searchForm}>
              <Field
                className={css.searchInput}
                autoComplete="off"
                autoFocus
                type="text"
                name="search"
                placeholder="Пошук"
              />
              <button className={css.searchBtn} type="submit">
                <IoIosSearch className={css.searchIcon} />
              </button>
            </Form>
          </Formik>
          <div>
            <MovieList items={movies} />
          </div>
        </div>
      </section>
    </>
  );
}
