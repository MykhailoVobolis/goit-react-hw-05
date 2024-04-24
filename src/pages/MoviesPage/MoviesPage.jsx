import { Field, Form, Formik } from "formik";
import { IoIosSearch } from "react-icons/io";
import css from "./MoviesPage.module.css";
import toast from "react-hot-toast";
import { searchMovies } from "../../tmdb-api";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import MovieList from "../../components/MovieList/MovieList";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const inputValue = searchParams.get("name");

  const handleSubmit = (value, actions) => {
    !value.search
      ? toast("Введіть назву фільму!", {
          style: {
            color: "#ffffff",
            backgroundColor: "#FF8C00",
          },
        })
      : setSearchParams({ name: value.search });

    actions.resetForm();
  };

  useEffect(() => {
    async function fetchMovies() {
      if (!inputValue) return;
      try {
        setMovies([]);
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
  }, [searchParams]);

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
