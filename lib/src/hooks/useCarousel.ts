import { useEffect, useRef, useState } from "react";
import {
  Attrs,
  CarouselScrollToIndex,
  CarouselScrollToNextFrame,
  CarouselScrollToPrevFrame,
  UseCarouselHook,
} from "../types";
import { detectIfRtl, getChildrensLength } from "../utils";

export const useCarousel: UseCarouselHook = (initialActive = 0) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(initialActive);

  const scrollToIndex: CarouselScrollToIndex = (toIdx) => {
    setActive(toIdx);
  };

  const scrollToNextFrame: CarouselScrollToNextFrame = (itemsPerSlide = 1) => {
    const len = getChildrensLength(carouselRef.current);
    const toIdx = Math.min(active + itemsPerSlide, len - itemsPerSlide);
    setActive(toIdx);
  };

  const scrollToPrevFrame: CarouselScrollToPrevFrame = (itemsPerSlide = 1) => {
    const toIdx = Math.max(active - itemsPerSlide, 0);
    setActive(toIdx);
  };

  const scroll = (i: number) => {
    if (!carouselRef.current) return;

    const itemsPerSlide =
      Number(carouselRef.current.getAttribute(Attrs.dataPerSlide)) || 1;

    const width = carouselRef.current.offsetWidth / itemsPerSlide;

    const isRtl = detectIfRtl(carouselRef.current) ? -1 : 1;

    carouselRef.current.scrollLeft = width * isRtl * i;
  };

  useEffect(() => {
    scroll(active);
  }, [active]);

  return {
    carouselRef,

    scrollToIndex,
    scrollToNextFrame,
    scrollToPrevFrame,

    active,
    setActive,
  };
};
