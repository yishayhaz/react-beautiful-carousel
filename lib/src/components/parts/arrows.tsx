import React, { CSSProperties } from "react";
import { CarouselArrowProps } from "../../types";
import { detectIfRtl } from "../../utils";

export default function CarouselArrows({
  active,
  length,
  scrollTo,

  className,

  color,
  bg,

  arrowIcon,
}: CarouselArrowProps) {
  const isRtl = detectIfRtl() === -1;

  return (
    <>
      <button
        aria-label={`Go to next slide`}
        onClick={() => scrollTo(active - 1)}
        className={`react-carousel__arrow ${isRtl ? "--right" : "--left"} ${
          className || ""
        }`}
        disabled={active === 0}
        style={
          {
            "--color": color,
            "--bg": bg,
          } as CSSProperties
        }
      >
        {arrowIcon || <span>{"<"}</span>}
      </button>
      <button
        aria-label={`Go to previous slide`}
        onClick={() => scrollTo(active + 1)}
        className={`react-carousel__arrow ${isRtl ? "--left" : "--right"} ${
          className || ""
        }`}
        disabled={active === length - 1}
        style={
          {
            "--color": color,
            "--bg": bg,
          } as CSSProperties
        }
      >
        {arrowIcon || <span>{"<"}</span>}
      </button>
    </>
  );
}
