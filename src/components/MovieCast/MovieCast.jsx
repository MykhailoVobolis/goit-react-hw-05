import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Spinner from "../Spinner/Spinner";
import SliderCast from "../SliderCast/SliderCast";
import NoResults from "../NoResults/NoResults.jsx";

import { getMovieCast } from "../../tmdb-api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function MovieCast() {
  const { movieId } = useParams();

  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function handleClickActors() {
      try {
        setLoading(true);
        const data = await getMovieCast(movieId);
        // Відбір із масиву учасників фільму тільки акторів і тих хто мають profile_path
        const onlyActors = data.cast.filter(
          (actor) => actor.known_for_department === "Acting" && actor.profile_path !== null
        );

        setActors((prevActors) => {
          return actors.length > 0 ? [...prevActors, ...onlyActors] : onlyActors;
        });
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    handleClickActors();
  }, [movieId]);

  return (
    <>
      {loading && <Spinner loading={loading} />}
      {actors.length > 0 ? (
        <SliderCast actors={actors} />
      ) : (
        <NoResults
          mainText={"На жаль, ще немає даних про акторів цього фільму. Спробуй пізніше"}
          mobileText={"Ще немає даних про акторів цього фільму"}
        />
      )}
      {error && <ErrorMessage error={error} />}
    </>
  );
}
