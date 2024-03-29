import React, { forwardRef, useImperativeHandle } from "react";
import { useCarousel } from "../hooks/useCarousel";
import CarouselArrows from "../parts/arrows";
import CarouselDots from "../parts/dots";
import { CarouselProps, CarouselRef } from "../types";

export const Carousel = forwardRef<CarouselRef, CarouselProps>(
  (
    {
      children,
      showArrows,
      arrowsProps,
      showDots,
      dotsProps,
      className,
      disableSwipe,
      initialActive,
      ...rest
    },
    ref
  ) => {
    const {
      carouselRef,
      active,
      scrollToIndex,
      scrollToNextFrame,
      isPressing,
      scrollToPrevFrame,
    } = useCarousel(initialActive, disableSwipe);

    useImperativeHandle(ref, () => ({
      scrollToIndex,
      active,
    }));

    return (
      <>
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
              scrollToIndex={scrollToIndex}
              {...dotsProps}
            />
          )}

          {!showArrows ? null : (
            <CarouselArrows
              active={active}
              len={children.length}
              scrollToNextFrame={scrollToNextFrame}
              scrollToPrevFrame={scrollToPrevFrame}
              {...arrowsProps}
            />
          )}
        </div>
      </>
    );
  }
);
