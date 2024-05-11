import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Spinner from "../Spinner/Spinner";
import SliderCast from "../SliderCast/SliderCast";
import toast, { Toaster } from "react-hot-toast";

import { getMovieCast } from "../../tmdb-api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import css from "./MovieCast.module.css";

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
        if (!data.cast.length) {
          toast("На жаль, ще немає даних про акторів цього фільму. Будь ласка, спробуйте пізніше.", {
            style: {
              color: "#ffffff",
              backgroundColor: "#FF8C00",
            },
          });
          return;
        }
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

  useEffect(() => {
    window.scrollTo({
      top: "1280",
      behavior: "smooth",
    });
  }, [actors]);

  return (
    <>
      {loading && <Spinner loading={loading} />}
      {actors.length > 0 && <SliderCast actors={actors} />}
      {error && <ErrorMessage error={error} />}
      <Toaster position="top-right" containerStyle={{ zIndex: 99999999 }} />
    </>
  );
}
