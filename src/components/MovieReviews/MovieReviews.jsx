import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Spinner from "../Spinner/Spinner";
import toast, { Toaster } from "react-hot-toast";

import { getMovieReviews } from "../../tmdb-api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function handleClickReviews() {
      try {
        setLoading(true);
        const data = await getMovieReviews(movieId);
        if (!data.results.length) {
          toast("На жаль, зараз немає відгуків до цього фільму. Будь ласка спробуйте пізніше", {
            style: {
              color: "#ffffff",
              backgroundColor: "#FF8C00",
            },
          });
          return;
        }
        setReviews((prevReview) => {
          return reviews.length > 0 ? [...prevReview, ...data.results] : data.results;
        });
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    handleClickReviews();
  }, [movieId]);

  useEffect(() => {
    window.scrollTo({
      top: "1280",
      behavior: "smooth",
    });
  }, [reviews]);

  return (
    <>
      {loading && <Spinner loading={loading} />}
      {reviews.length > 0 && (
        <ul className={css.reviewsList}>
          {reviews.map((item) => (
            <li className={css.reviewItem} key={item.id}>
              <h3 className={css.authorReviewName}>{item.author}</h3>
              <p className={css.textReview}>{item.content}</p>
            </li>
          ))}
        </ul>
      )}
      {error && <ErrorMessage error={error} />}
      <Toaster position="top-right" containerStyle={{ zIndex: 99999999 }} />
    </>
  );
}
