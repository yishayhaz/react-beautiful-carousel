import React, { useEffect, useImperativeHandle, forwardRef } from "react";
import { CarouselSliderProps, CarouselSliderRef } from "../types";
import CarouselArrows from "../parts/arrows";
import { setChildrensMinWidth } from "../utils";
import { useCarousel } from "../hooks/useCarousel";

export const CarouselSlider = forwardRef<
  CarouselSliderRef,
  CarouselSliderProps
>(
  (
    {
      children,
      showArrows,
      arrowsProps,
      itemsPerSlide = 1,
      className,
      ...rest
    },
    ref
  ) => {
    const {
      carouselRef,
      active,
      scrollToNextFrame,
      scrollToPrevFrame,
      scrollToIndex,
    } = useCarousel();

    useEffect(() => {
      if (!carouselRef.current) return;
      setChildrensMinWidth(carouselRef.current, 100 / itemsPerSlide);
    }, [carouselRef.current, itemsPerSlide]);

    useImperativeHandle(ref, () => ({
      scrollToPrevFrame: () => scrollToPrevFrame(itemsPerSlide),
      scrollToNextFrame: () => scrollToNextFrame(itemsPerSlide),
      scrollToIndex,
      active,
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
            scrollToNextFrame={() => scrollToNextFrame(itemsPerSlide)}
            scrollToPrevFrame={() => scrollToPrevFrame(itemsPerSlide)}
            {...arrowsProps}
          />
        )}
      </div>
    );
  }
);
