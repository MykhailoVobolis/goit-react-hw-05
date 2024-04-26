import { Field, Form, Formik } from "formik";
import toast, { Toaster } from "react-hot-toast";

import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { searchMovies } from "../../tmdb-api";

import css from "./MoviesPage.module.css";

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
            backgroundColor: "#ef4040",
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
          toast("На жаль, немає фільмів, які відповідають вашому пошуковому запиту. Будь ласка спробуйте ще раз!", {
            style: {
              color: "#ffffff",
              backgroundColor: "#FF8C00",
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
          {loading && <Loader loading={loading} />}
          {error && <ErrorMessage error={error} />}
          {movies.length > 0 && <MovieList items={movies} />}
        </div>
      </section>
      <Toaster position="top-right" containerStyle={{ zIndex: 99999999 }} />
    </>
  );
}
