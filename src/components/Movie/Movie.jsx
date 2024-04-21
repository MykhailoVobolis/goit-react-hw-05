import css from "./Movie.module.css";

export default function Movie({ item }) {
  return (
    <div>
      <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title} width="233px" height="350px" />
    </div>
  );
}
