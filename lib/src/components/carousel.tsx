import React, { useEffect, useState, useRef } from "react";
import { CarouselProps } from "../types";
import CarouselArrows from "./parts/arrows";
import CarouselDots from "./parts/dots";
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
    <div {...rest} className={`react-carousel__wrraper ${className || ""}`}>
      <div ref={carouselRef} className={`react-carousel`}>
        {children}
      </div>

      {!showDots ? null : (
        <CarouselDots
          length={children.length}
          active={active}
          scrollTo={scrollByIndex}
          {...dotsProps}
        />
      )}

      {!showArrows ? null : (
        <CarouselArrows
          active={active}
          length={children.length}
          scrollTo={scrollByIndex}
          {...arrowsProps}
        />
      )}
    </div>
  );
}
