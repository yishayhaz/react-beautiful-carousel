import React from "react";
import { CarouselSliderProps } from "../types";
import CarouselArrows from "../parts/arrows";
import { useCarousel } from "../hooks/useCarousel";

export function CarouselSlider({
  children,
  arrowsProps,
  itemsPerSlide = 1,
  className,
  ...rest
}: CarouselSliderProps) {
  const { carouselRef, active, scrollTo } = useCarousel();

  return (
    <div
      {...rest}
      className={`react-carousel__wrapper --slider ${className || ""}`}
    >
      <div ref={carouselRef} className={`react-carousel`}>
        {children}
      </div>

      <CarouselArrows
        active={active}
        len={children.length - itemsPerSlide + 1}
        scrollTo={(i) => scrollTo(i, itemsPerSlide)}
        {...arrowsProps}
      />
    </div>
  );
}
