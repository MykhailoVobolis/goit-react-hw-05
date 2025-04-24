import { ColorRing } from "react-loader-spinner";

import css from "./Loader.module.css";

export default function Loader({ loading }) {
  return (
    <div className={css.preloader}>
      <ColorRing
        visible={loading}
        ariaLabel="color-ring-wrapper"
        wrapperClass={css.colorRingLoading}
        colors={["#fec90c", "#fec90c", "#fec90c", "#fec90c", "#fec90c"]}
      />
    </div>
  );
}
