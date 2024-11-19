import Plyr from "plyr-react";
import "plyr/dist/plyr.css"; // Стандартний стиль Plyr
import css from "./CustomPlayer.module.css";

export default function CustomPlayer({ isOpen, trailerUrl }) {
  return (
    <div className={css.overflowHidden}>
      <Plyr
        source={{
          type: "video",
          sources: [
            {
              src: trailerUrl,
              provider: "youtube",
            },
          ],
        }}
        options={{
          autoplay: isOpen, // Автоматичне відтворення
        }}
        controls // Показувати контролери
      />
    </div>
  );
}
