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

export const useCarousel: UseCarouselHook = (
  initialActive = 0,
  disableSwipe
) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const [active, _setActive] = useState(initialActive);
  const [isPressing, setIsPressing] = useState(false);

  const _setActiveByPos = () => {
    if (!carouselRef.current) return;

    const { scrollWidth } = carouselRef.current;
    const childWidth = scrollWidth / getChildrensLength(carouselRef.current);

    const crrOffset = Math.abs(
      Number(getAttr(carouselRef.current, Attrs.crrScrollOffset)) || 0
    );

    _setActive(Math.round(crrOffset / childWidth));
  };

  const _scrollByIdx = (idx: number) => {
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

    setAttr(carouselRef.current, Attrs.disableTransition, "true");

    const pageX = getPageX(e);

    const crrDragOffset =
      Number(getAttr(carouselRef.current, Attrs.crrScrollOffset)) || 0;

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

    // _setActiveByPos();
  };

  const _handlePressEnd = () => {
    if (!carouselRef.current) return;

    setAttr(carouselRef.current, Attrs.disableTransition, "false");
    setIsPressing(false);

    const { scrollWidth, offsetWidth } = carouselRef.current;
    const isRtl = detectIfRtl(carouselRef.current);

    const crrDragOffset = Number(
      getAttr(carouselRef.current, Attrs.crrScrollOffset)
    );

    setAttr(carouselRef.current, Attrs.dragStartPageX, "0");

    const maxEndDistance = isRtl
      ? scrollWidth - offsetWidth
      : -scrollWidth + offsetWidth;

    const isBeforeStart = isRtl ? crrDragOffset < 0 : crrDragOffset > 0;

    const isAfterEnd = isRtl
      ? crrDragOffset > maxEndDistance
      : crrDragOffset < maxEndDistance;

    if (isBeforeStart) {
      snapTo(carouselRef.current, 0);
    } else if (isAfterEnd) {
      snapTo(carouselRef.current, maxEndDistance);
    } else {
      snapTo(
        carouselRef.current,
        Math.round(crrDragOffset / offsetWidth) * offsetWidth
      );
    }
    _setActiveByPos();
  };

  useEffect(() => {
    if (!carouselRef.current || disableSwipe) return;

    carouselRef.current.addEventListener("mousedown", _handlePressStart);
    carouselRef.current.addEventListener("touchstart", _handlePressStart);

    return () => {
      carouselRef.current?.removeEventListener("mousedown", _handlePressStart);
      carouselRef.current?.removeEventListener("touchstart", _handlePressStart);
    };
  }, [disableSwipe]);

  useEffect(() => {
    if (!carouselRef.current || !isPressing || disableSwipe) return;

    window.addEventListener("touchmove", _handleDrag);
    window.addEventListener("mousemove", _handleDrag);

    window.addEventListener("mouseup", _handlePressEnd);
    window.addEventListener("touchend", _handlePressEnd);
    window.addEventListener("touchcancel", _handlePressEnd);

    return () => {
      window.removeEventListener("touchmove", _handleDrag);
      window.removeEventListener("mousemove", _handleDrag);

      window.removeEventListener("mouseup", _handlePressEnd);
      window.removeEventListener("touchend", _handlePressEnd);
      window.removeEventListener("touchcancel", _handlePressEnd);
    };
  }, [isPressing, disableSwipe]);

  const scrollToIndex: CarouselScrollToIndex = (toIdx) => {
    setActive(
      Math.max(0, Math.min(toIdx, getChildrensLength(carouselRef.current) - 1))
    );
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

  const setActive = (idx: number) => {
    _setActive(idx);
    _scrollByIdx(idx);
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
