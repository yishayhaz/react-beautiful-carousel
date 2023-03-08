import React from "react";
import { useCarousel } from "../hooks/useCarousel";
import CarouselArrows from "../parts/arrows";
import CarouselDots from "../parts/dots";
import { CarouselProps } from "../types";

export function Carousel({
  children,
  showArrows,
  arrowsProps,
  showDots,
  dotsProps,
  className,
  ...rest
}: CarouselProps) {
  const { carouselRef, active, scrollTo } = useCarousel();

  return (
    <div
      {...rest}
      className={`react-carousel__wrapper --basic ${className || ""}`}
    >
      <div ref={carouselRef} className={`react-carousel`}>
        {children}
      </div>

      {!showDots ? null : (
        <CarouselDots
          len={children.length}
          active={active}
          scrollTo={scrollTo}
          {...dotsProps}
        />
      )}

      {!showArrows ? null : (
        <CarouselArrows
          active={active}
          len={children.length}
          scrollTo={scrollTo}
          {...arrowsProps}
        />
      )}
    </div>
  );
}
