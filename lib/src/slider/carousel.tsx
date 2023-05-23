import React, {
  useEffect,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from "react";
import { Attrs, CarouselSliderProps, CarouselSliderRef } from "../types";
import CarouselArrows from "../parts/arrows";
import { setChildrensMinWidth, getOptimalItemsPerSlide } from "../utils";
import { useCarousel } from "../hooks/useCarousel";
import { useWindowSize } from "../hooks/useWindowSize";

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
      itemsMinWidth,
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

    const windowSize = useWindowSize();

    const _itemsPerSlide = useCallback(() => {
      if (!carouselRef.current) return itemsPerSlide;

      return getOptimalItemsPerSlide(
        carouselRef.current,
        itemsPerSlide,
        itemsMinWidth
      );
    }, [windowSize, itemsPerSlide, itemsMinWidth, children.length]);

    useEffect(() => {
      if (!carouselRef.current) return;

      carouselRef.current.setAttribute(
        Attrs.itemsPerSlide,
        _itemsPerSlide().toString()
      );

      setChildrensMinWidth(carouselRef.current, _itemsPerSlide());
    }, [carouselRef.current, _itemsPerSlide]);

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

        {!showArrows || itemsPerSlide >= children.length ? null : (
          <CarouselArrows
            active={active}
            len={children.length - _itemsPerSlide() + 1}
            scrollToNextFrame={() => scrollToNextFrame(_itemsPerSlide())}
            scrollToPrevFrame={() => scrollToPrevFrame(_itemsPerSlide())}
            {...arrowsProps}
          />
        )}
      </div>
    );
  }
);
