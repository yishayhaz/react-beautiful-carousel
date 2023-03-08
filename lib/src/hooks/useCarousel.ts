import { useEffect, useRef, useState } from "react";
import { detectIfRtl, getChildWidth, getChildrensLength } from "../utils";

export const useCarousel = (initialActive = 0) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(initialActive);

  // toIdx: 10, itemsPerSlide=5, active: 10, len: 20
  // 1-5, 6-10, 11-15, 16-20
  const scrollTo = (toIdx: number, itemsPerSlide: number = 1) => {
    if (toIdx > active) {
      const len = getChildrensLength(carouselRef.current);

      toIdx = Math.min(toIdx + itemsPerSlide - 1, len - itemsPerSlide);
    } else if (toIdx < active) {
      toIdx = Math.max(toIdx - itemsPerSlide + 1, 0);
    }

    setActive(toIdx);
  };

  const scroll = (i: number) => {
    if (!carouselRef.current) return;

    const width = getChildWidth(carouselRef.current);

    const isRtl = detectIfRtl(carouselRef.current) ? -1 : 1;

    carouselRef.current.scrollLeft = width * isRtl * i;
  };

  useEffect(() => {
    scroll(active);
  }, [active]);

  return {
    carouselRef,
    active,
    setActive,
    scrollTo,
  };
};
