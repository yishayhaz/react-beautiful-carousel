import { useEffect, useRef, useState } from "react";
import {
  Attrs,
  CarouselScrollToIndex,
  CarouselScrollToNextFrame,
  CarouselScrollToPrevFrame,
  UseCarouselHook,
} from "../types";
import { getAttr } from "../utils/getAttr";
import { getChildrensLength } from "../utils/getChildrensLength";
import { getPageX } from "../utils/getPageX";
import { setAttr } from "../utils/setAttr";
import { setDrag } from "../utils/setDrag";
import { snapTo } from "../utils/snapTo";
import { scrollChildrenTo } from "../utils/scrollChildrenTo";
import { detectIfRtl } from "../utils";

export const useCarousel: UseCarouselHook = (initialActive = 0) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(initialActive);
  const [isPressing, setIsPressing] = useState(false);

  const _scroll = (idx: number) => {
    if (!carouselRef.current) return;

    const { offsetWidth } = carouselRef.current;
    const itemsPerSlide =
      Number(getAttr(carouselRef.current, Attrs.itemsPerSlide)) || 1;

    const scrollWidth = offsetWidth / itemsPerSlide;

    const rtlBinary = detectIfRtl(carouselRef.current) ? 1 : -1;

    scrollChildrenTo(carouselRef.current, idx * scrollWidth * rtlBinary);
    setAttr(
      carouselRef.current,
      Attrs.crrScrollOffset,
      (idx * scrollWidth * rtlBinary).toString()
    );
  };

  const _handlePressStart = (e: MouseEvent | TouchEvent) => {
    if (!carouselRef.current) return;

    setIsPressing(true);

    setAttr(carouselRef.current, Attrs.animate, "false");

    const pageX = getPageX(e);

    const crrDragOffset =
      Number(getAttr(carouselRef.current, Attrs.crrScrollOffset)) || 0;

    // * Save the current mouse position
    // * Save the current translate value

    setAttr(
      carouselRef.current,
      Attrs.dragStartOffset,
      crrDragOffset.toString()
    );
    setAttr(carouselRef.current, Attrs.dragStartPageX, pageX.toString());
  };

  const _handleDrag = (e: TouchEvent | MouseEvent) => {
    if (!isPressing || !carouselRef.current) return;

    e.preventDefault();

    setDrag(carouselRef.current, getPageX(e));
  };

  const _handlePressEnd = () => {
    setIsPressing(false);

    if (!carouselRef.current) return;

    const { scrollWidth } = carouselRef.current;

    const childWidth = scrollWidth / getChildrensLength(carouselRef.current);

    const crrDragOffset = Number(
      getAttr(carouselRef.current, Attrs.crrScrollOffset)
    );

    setAttr(carouselRef.current, Attrs.animate, "true");
    setAttr(carouselRef.current, Attrs.dragStartPageX, "0");

    if (crrDragOffset > 0) {
      console.log("snap before 0");
      return snapTo(carouselRef.current, 0);
    }

    const maxEndDistance = -scrollWidth + childWidth;

    if (crrDragOffset < maxEndDistance) {
      console.log("snap end");
      return snapTo(carouselRef.current, maxEndDistance);
    }

    snapTo(
      carouselRef.current,
      Math.round(crrDragOffset / childWidth) * childWidth
    );
  };

  useEffect(() => {
    if (!carouselRef.current) return;

    carouselRef.current.addEventListener("mousedown", _handlePressStart);
    carouselRef.current.addEventListener("touchstart", _handlePressStart);

    window.addEventListener("mouseup", _handlePressEnd);
    window.addEventListener("touchend", _handlePressEnd);
    window.addEventListener("touchcancel", _handlePressEnd);

    return () => {
      carouselRef.current?.removeEventListener("mousedown", _handlePressStart);
      carouselRef.current?.removeEventListener("touchstart", _handlePressStart);

      window.removeEventListener("mouseup", _handlePressEnd);
      window.removeEventListener("touchend", _handlePressEnd);
      window.removeEventListener("touchcancel", _handlePressEnd);
    };
  }, []);

  useEffect(() => {
    _scroll(active);
  }, [active]);

  useEffect(() => {
    if (!carouselRef.current || !isPressing) return;

    window.addEventListener("touchmove", _handleDrag);
    window.addEventListener("mousemove", _handleDrag);

    return () => {
      window.removeEventListener("touchmove", _handleDrag);
      window.removeEventListener("mousemove", _handleDrag);
    };
  }, [isPressing]);

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
