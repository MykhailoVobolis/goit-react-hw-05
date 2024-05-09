import ReactPlayer from "react-player/youtube";

import css from "./Player.module.css";

export default function Player({ trailerUrl }) {
  return (
    <div className={css.playerContainer}>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${trailerUrl}`}
        height={"540px"}
        width={"960px"}
        controls={true}
        playing={"playing"}
        className={"css.overflowHidden"}
      />
    </div>
  );
}
