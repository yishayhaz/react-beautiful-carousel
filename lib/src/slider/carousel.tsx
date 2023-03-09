import React, { useEffect, useImperativeHandle, forwardRef } from "react";
import { CarouselSliderProps, CarouselSlider } from "../types";
import CarouselArrows from "../parts/arrows";
import { setChildrensMinWidth } from "../utils";
import { useCarousel } from "../hooks/useCarousel";

export const CarouselSlider: CarouselSlider = forwardRef(
  (
    {
      children,
      showArrows,
      arrowsProps,
      itemsPerSlide = 1,
      className,
      ...rest
    }: CarouselSliderProps,
    ref
  ) => {
    const { carouselRef, active, scrollTo } = useCarousel();

    useEffect(() => {
      if (!carouselRef.current) return;
      setChildrensMinWidth(carouselRef.current, 100 / itemsPerSlide);
    }, [carouselRef.current, itemsPerSlide]);

    useImperativeHandle(ref, () => ({
      scrollTo: (i: number) => scrollTo(i, itemsPerSlide),
      active: active,
    }));

    return (
      <div
        {...rest}
        className={`react-carousel__wrapper --slider ${className || ""}`}
      >
        <div ref={carouselRef} className={`react-carousel`}>
          {children}
        </div>

        {!showArrows ? null : (
          <CarouselArrows
            active={active}
            len={children.length - itemsPerSlide + 1}
            scrollTo={(i) => scrollTo(i, itemsPerSlide)}
            {...arrowsProps}
          />
        )}
      </div>
    );
  }
);
