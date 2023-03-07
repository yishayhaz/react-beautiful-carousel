import React, { CSSProperties } from "react";
import { CarouselDotsProps } from "../types";

export default function CarouselDots({
  length,
  active,
  scrollTo,

  className,
  activeClassName,

  color,
  activeColor,
  hoverColor,
  size,
}: CarouselDotsProps) {
  return (
    <div className="react-carousel__dots">
      {Array(length)
        .fill(0)
        .map((_, i) => (
          <button
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => scrollTo(i)}
            className={`${active === i ? "--active" : ""} ${className || ""} ${
              i === 0 ? activeClassName || "" : ""
            }`}
            style={
              {
                "--size": size,
                "--color": color,
                "--hover-color": hoverColor || color,
                "--active-color": activeColor || color,
              } as CSSProperties
            }
            key={i}
          ></button>
        ))}
    </div>
  );
}
