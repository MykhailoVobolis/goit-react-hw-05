import clsx from "clsx";

import { forwardRef } from "react";
import { BsChevronCompactLeft } from "react-icons/bs";
import { BsChevronCompactRight } from "react-icons/bs";

import css from "./SwiperNavButton.module.css";

const SwiperNavButton = forwardRef(({ direction }, ref) => {
  return (
    <button
      ref={ref}
      className={clsx(css.btnBase, {
        [css.left]: direction === "prev",
        [css.right]: direction === "next",
      })}>
      {direction === "prev" ? <BsChevronCompactLeft size={40} /> : <BsChevronCompactRight size={40} />}
    </button>
  );
});

SwiperNavButton.displayName = "NavButtons";

export default SwiperNavButton;
