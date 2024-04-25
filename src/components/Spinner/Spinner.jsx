import { ColorRing } from "react-loader-spinner";

import css from "./Spinner.module.css";

export default function Spinner({ loading }) {
  return (
    <div className={css.spinner}>
      <ColorRing
        visible={loading}
        height="80"
        width="80"
        ariaLabel="color-ring-wrapper"
        wrapperClass={css.colorRingLoading}
        colors={["#fec90c", "#fec90c", "#fec90c", "#fec90c", "#fec90c"]}
      />
    </div>
  );
}
