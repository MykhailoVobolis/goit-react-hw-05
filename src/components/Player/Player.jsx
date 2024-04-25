import css from "./Player.module.css";
import ReactPlayer from "react-player/youtube";

export default function Player() {
  return (
    <div className={css.playerContainer}>
      <ReactPlayer
        url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
        height={"540px"}
        width={"960px"}
        controls={"true"}
        className={"css.overflowHidden"}
      />
    </div>
  );
}
