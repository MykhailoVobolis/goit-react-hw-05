import Plyr from "plyr-react";
import "plyr/dist/plyr.css"; // Стандартний стиль Plyr
import css from "./CustomPlayer.module.css";

export default function CustomPlayer({ isOpen, trailerUrl }) {
  return (
    <div className={css.playerWrapper}>
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
          keyboard: {
            global: true, // Вмикає глобальне керування клавіатурою
          },
        }}
        controls // Показувати контролери
      />
    </div>
  );
}
