import ReactPlayer from "react-player/youtube";

export default function Player({ isOpen, trailerUrl }) {
  return (
    <>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${trailerUrl}`}
        width={"100%"}
        height={"100%"}
        controls={true}
        playing={isOpen}
        className={"css.overflowHidden"}
      />
    </>
  );
}
