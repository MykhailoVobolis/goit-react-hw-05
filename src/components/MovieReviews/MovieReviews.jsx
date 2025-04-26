import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Spinner from "../Spinner/Spinner";
import SliderReviews from "../SliderReviews/SliderReviews";
import NoResults from "../NoResults/NoResults.jsx";

import { getMovieReviews } from "../../tmdb-api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
      {reviews.length > 0 ? (
        <SliderReviews reviews={reviews} />
      ) : (
        <NoResults
          mainText={"На жаль, ще немає відгуків до цього фільму. Спробуй пізніше"}
          mobileText={"Ще немає відгуків до цього фільму"}
        />
      )}
      {error && <ErrorMessage error={error} />}
    </>
  );
}
