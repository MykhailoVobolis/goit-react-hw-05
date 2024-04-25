import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Spinner from "../Spinner/Spinner";

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

  return (
    <>
      {loading && <Spinner loading={loading} />}
      {reviews.length > 0 && (
        <ul className={css.reviewsList}>
          {reviews.map((item) => (
            <li className={css.reviewItem} key={item.id}>
              <h3 className={css.authorReviewName}>{item.author}</h3>
              <p>{item.content}</p>
            </li>
          ))}
        </ul>
      )}
      {error && <ErrorMessage error={error} />}
    </>
  );
}
