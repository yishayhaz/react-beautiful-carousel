import { useEffect, useRef, useState } from "react";
import { detectIfRtl, getChildWidth, getChildrensLength } from "../utils";

export const useCarousel = (initialActive = 0) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(initialActive);

  const scrollTo = (i: number, itemsPerPage: number = 1, gap: number = 0) => {
    const len = getChildrensLength(carouselRef.current);

    if (i < 0) i = 0;
    if (i > len - 1) i = len - 1;

    setActive(i);
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
