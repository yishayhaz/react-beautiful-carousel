import React, { useEffect } from "react";
import { CarouselSliderProps } from "../types";
import CarouselArrows from "../parts/arrows";
import { setChildrensMinWidth } from "../utils";
import { useCarousel } from "../hooks/useCarousel";

export const CarouselSlider = ({
  children,
  arrowsProps,
  itemsPerSlide = 1,
  className,
  ...rest
}: CarouselSliderProps) => {
  const { carouselRef, active, scrollTo } = useCarousel();

  useEffect(() => {
    if (!carouselRef.current) return;
    setChildrensMinWidth(carouselRef.current, 100 / itemsPerSlide);
  }, [carouselRef.current, itemsPerSlide]);

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
};
