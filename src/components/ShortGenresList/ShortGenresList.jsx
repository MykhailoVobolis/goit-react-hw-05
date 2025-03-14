import { Link } from "react-router-dom";
import { AiOutlineAim } from "react-icons/ai";
import { RiShipLine } from "react-icons/ri";
import { GiMagickTrick } from "react-icons/gi";
import { FaTheaterMasks } from "react-icons/fa";
import { GiPistolGun } from "react-icons/gi";

import css from "./ShortGenresList.module.css";

export default function ShortGenresList({ genres }) {
  const shortList = genres.slice(0, 5);

  const iconComponents = [AiOutlineAim, RiShipLine, GiMagickTrick, FaTheaterMasks, GiPistolGun];

  return (
    <ul className={css.shortGenresList}>
      {shortList.map((item, index) => {
        const IconComponent = iconComponents[index];

        return (
          <li key={item.id}>
            <Link
              className={css.genreItemWrapper}
              to={`/collection/movies_by_genre?genreId=${item.id}&genreName=${encodeURIComponent(item.name)}`}
              state={{ name: item.name }}>
              <IconComponent className={css.genreIcon} size={36} />
              <p className={css.genreItem}>{item.name}</p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
