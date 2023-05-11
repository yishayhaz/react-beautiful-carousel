import { useEffect, useRef } from "react";

export type UseSwiper = () => UseSwipetReturn;

export type UseSwipetReturn = {
  ref: UseSwiperRef;
};

export type UseSwiperRef = React.RefObject<HTMLDivElement>;

export const useSwiper: UseSwiper = () => {
  const ref: UseSwiperRef = useRef(null);

  const onKeyDown = (e: KeyboardEvent) => {
    const target = e.target as HTMLDivElement;
    if (!target?.matches("." + ref.current?.className)) return;

    console.log("onKeyDown!");
  };

  const onTouchStart = (e: TouchEvent) => {};

  const onMouseMove = (e: MouseEvent) => {
    const target = e.target as HTMLDivElement;
    if (!target?.matches("." + ref.current?.className)) return;

    console.log(e);
  };

  const onTouchMove = (e: TouchEvent) => {};

  const onKeyUp = (e: KeyboardEvent) => {};

  const onTouchEnd = (e: TouchEvent) => {};

  const onTouchCancel = (e: TouchEvent) => {};

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchcancel", onTouchCancel);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchCancel);
    };
  }, [ref.current]);

  return {
    ref,
  };
};