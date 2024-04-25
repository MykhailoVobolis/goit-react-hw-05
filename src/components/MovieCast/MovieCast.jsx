import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Spinner from "../Spinner/Spinner";

import { getMovieCast } from "../../tmdb-api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import css from "./MovieCast.module.css";

const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

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
        setActors((prevActors) => {
          return actors.length > 0 ? [...prevActors, ...data.cast] : data.cast;
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
    </>
  );
}
