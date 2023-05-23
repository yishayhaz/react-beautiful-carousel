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

  const [isPressing, setIsPressing] = useState(false);

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

  const handlePressStart = (e: MouseEvent | TouchEvent) => {
    if (!carouselRef.current) return;

    const { pageX } = e instanceof MouseEvent ? e : e.touches[0];

    const crrDragOffset =
      Number(carouselRef.current.getAttribute(Attrs.crrScrollOffset)) ?? 0;

    carouselRef.current.setAttribute(
      Attrs.dragStartOffset,
      String(crrDragOffset)
    );
    carouselRef.current.setAttribute(Attrs.dragStartPageX, String(pageX));

    setIsPressing(true);
  };

  const handlePressEnd = (e: MouseEvent | TouchEvent) => {
    setIsPressing(false);

    if (!carouselRef.current) return;

    const width = carouselRef.current.scrollWidth;
    const childWidth = width / getChildrensLength(carouselRef.current);

    const crrDragOffset = Number(
      carouselRef.current.getAttribute(Attrs.crrScrollOffset)
    );

    if (crrDragOffset > 0) {
      carouselRef.current.setAttribute(Attrs.crrScrollOffset, "0");
      [...carouselRef.current.children].forEach((child) => {
        child.setAttribute("style", `transform: translateX(0px)`);
      });
      return;
    }

    const isPastTheEnd = -width + childWidth;
    if (crrDragOffset < isPastTheEnd) {
      carouselRef.current.setAttribute(
        Attrs.crrScrollOffset,
        isPastTheEnd.toString()
      );
      [...carouselRef.current.children].forEach((child) => {
        child.setAttribute("style", `transform: translateX(${isPastTheEnd}px)`);
      });
      return;
    }

    const snapTo = Math.round(crrDragOffset / childWidth) * childWidth;

    carouselRef.current.setAttribute(Attrs.crrScrollOffset, snapTo.toString());
    [...carouselRef.current.children].forEach((child) => {
      child.setAttribute("style", `transform: translateX(${snapTo}px)`);
    });
  };

  const handleDrag = (e: TouchEvent | MouseEvent) => {
    if (!isPressing || !carouselRef.current) return;
    e.preventDefault();

    const { pageX } = e instanceof MouseEvent ? e : e.touches[0];
    const dragStartOffset = Number(
      carouselRef.current.getAttribute(Attrs.dragStartOffset)
    );
    const dragStartPageX = Number(
      carouselRef.current.getAttribute(Attrs.dragStartPageX)
    );

    const newDrag = pageX - dragStartPageX + dragStartOffset;

    [...carouselRef.current.children].forEach((child) => {
      child.setAttribute("style", `transform: translateX(${newDrag}px)`);
    });

    carouselRef.current.setAttribute(Attrs.crrScrollOffset, newDrag.toString());
  };

  useEffect(() => {
    scroll(active);
  }, [active]);

  useEffect(() => {
    if (!carouselRef.current) return;

    carouselRef.current.addEventListener("mousedown", handlePressStart);
    carouselRef.current.addEventListener("touchstart", handlePressStart);

    window.addEventListener("mouseup", handlePressEnd);
    window.addEventListener("touchend", handlePressEnd);
    window.addEventListener("touchcancel", handlePressEnd);

    return () => {
      carouselRef.current?.removeEventListener("mousedown", handlePressStart);
      carouselRef.current?.removeEventListener("touchstart", handlePressStart);

      window.removeEventListener("mouseup", handlePressEnd);
      window.removeEventListener("touchend", handlePressEnd);
      window.removeEventListener("touchcancel", handlePressEnd);
    };
  }, []);

  useEffect(() => {
    if (!carouselRef.current || !isPressing) return;

    window.addEventListener("touchmove", handleDrag);
    window.addEventListener("mousemove", handleDrag);

    return () => {
      window.removeEventListener("touchmove", handleDrag);
      window.removeEventListener("mousemove", handleDrag);
    };
  }, [isPressing]);

  return {
    carouselRef,

    scrollToIndex,
    scrollToNextFrame,
    scrollToPrevFrame,

    active,
    setActive,

    isPressing,
  };
};
