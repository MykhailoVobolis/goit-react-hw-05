import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Spinner from "../Spinner/Spinner";
import toast, { Toaster } from "react-hot-toast";

import { getMovieCast } from "../../tmdb-api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import css from "./MovieCast.module.css";

const defaultImg =
  "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg";

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
          toast("На жаль, ми зараз не маємо даних про акторів цього фільму. Будь ласка спробуйте пізніше", {
            style: {
              color: "#ffffff",
              backgroundColor: "#FF8C00",
            },
          });
          return;
        }
        // Відбір із масиву учасників фільму тільки акторів
        const onlyActors = data.cast.filter((actor) => actor.known_for_department === "Acting");
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
      {actors.length > 0 && (
        <ul className={css.actorsList}>
          {actors.map((item) => (
            <li className={css.actorCard} key={item.id}>
              <img
                className={css.actorImage}
                src={item.profile_path ? `https://image.tmdb.org/t/p/w500${item.profile_path}` : defaultImg}
                alt={item.name}
                width="191px"
                height="285px"
              />
              <div className={css.nameContainer}>
                <p className={css.actorName}>{item.name}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
      {error && <ErrorMessage error={error} />}
      <Toaster position="top-right" containerStyle={{ zIndex: 99999999 }} />
    </>
  );
}
