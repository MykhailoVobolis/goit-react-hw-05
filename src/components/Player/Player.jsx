import ReactPlayer from "react-player/youtube";

import css from "./Player.module.css";

const defaultUrl = "https://www.youtube.com/watch?v=KVZA8xsnC28";

export default function Player({ trailerUrl }) {
  return (
    <div className={css.playerContainer}>
      <ReactPlayer
        url={trailerUrl ? `https://www.youtube.com/watch?v=${trailerUrl}` : defaultUrl}
        height={"540px"}
        width={"960px"}
        controls={true}
        className={"css.overflowHidden"}
      />
    </div>
  );
}
