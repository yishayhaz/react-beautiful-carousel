import React, { forwardRef, useCallback, useImperativeHandle } from "react";
import { useCarousel } from "../hooks/useCarousel";
import CarouselArrows from "../parts/arrows";
import CarouselDots from "../parts/dots";
import { CarouselProps, CarouselRef } from "../types";
import { useSwiper } from "../hooks/useSwiper";

export const Swiper = forwardRef<CarouselRef, CarouselProps>(
  (
    {
      children,
      showArrows,
      arrowsProps,
      showDots,
      dotsProps,
      className,
      ...rest
    },
    ref
  ) => {
    const {
      carouselRef,
      active,
      scrollToIndex,
      scrollToNextFrame,
      scrollToPrevFrame,
    } = useCarousel();
    const swiper = useSwiper();

    const mergeRefs = (...refs) => {
      return (node) => {
        for (const ref of refs) {
          ref.current = node;
        }
      };
    };

    useImperativeHandle(ref, () => ({
      scrollToIndex,
      active,
    }));

    return (
      <div
        {...rest}
        className={`react-carousel__wrapper --basic ${className || ""}`}
      >
        <div
          ref={mergeRefs(carouselRef, swiper.ref)}
          className={`react-carousel`}
        >
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
    );
  }
);
