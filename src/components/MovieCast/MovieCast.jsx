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
        setActors(data.cast);
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
      <ul className={css.actorsList}>
        {actors.map((item) => (
          <li className={css.actorCard} key={item.id}>
            <img
              className={css.actorImage}
              src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
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
    </>
  );
}
