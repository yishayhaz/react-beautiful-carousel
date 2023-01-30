import React, { useEffect, useState, useRef } from "react";
import { CarouselProps } from "../types";
import { detectIfRtl, getChildWidth } from "../utils";

export default function Carousel({
  children,
  showArrows,
  arrowsProps,
  showDots,
  dotsProps,
  className,
  ...rest
}: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [active, _setActive] = useState(0);

  const scrollByIndex = (i: number) => {
    if (i < 0) i = 0;
    if (i > children.length - 1) i = children.length - 1;

    _setActive(i);
  };

  const scrollByDir = (dir: string = "left") => {
    const isRtl = detectIfRtl(carouselRef.current);

    if (dir === "left") {
      scrollByIndex(active - 1 * isRtl);
    } else {
      scrollByIndex(active + 1 * isRtl);
    }
  };

  const scroll = (i: number) => {
    const width = getChildWidth(carouselRef.current);

    if (!carouselRef.current) return;

    const isRtl = detectIfRtl(carouselRef.current);

    carouselRef.current.scrollLeft = width * isRtl * i;
  };

  useEffect(() => {
    scroll(active);
  }, [active]);

  return (
    <div className={`react-carousel__wrraper ${className || ""}`} {...rest}>
      <div ref={carouselRef} className={`react-carousel`}>
        {children}
      </div>

      {!showDots ? null : (
        <div className="react-carousel__dots">
          {children.map((_, i) => (
            <button
              onClick={() => scrollByIndex(i)}
              className={active === i ? "--active" : ""}
              key={i}
            ></button>
          ))}
        </div>
      )}

      {!showArrows ? null : (
        <>
          <button
            onClick={() => scrollByDir("left")}
            className="react-carousel__arrow --left"
          >
            {"<"}
          </button>
          <button
            onClick={() => scrollByDir("right")}
            className="react-carousel__arrow --right"
          >
            {">"}
          </button>
        </>
      )}
    </div>
  );
}
