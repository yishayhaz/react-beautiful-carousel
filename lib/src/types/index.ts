import React, { CSSProperties } from "react";

export interface Tag extends React.HTMLAttributes<HTMLElement> {}

export type CarouselSliderItemProps = Tag;

export enum Attrs {
  itemsPerSlide = "data-items-per-slide",
  dragStartOffset = "data-start-offset",
  crrScrollOffset = "data-scroll-offset",
  dragStartPageX = "data-start-x",
  disableTransition = "data-disable-transition",
}

export interface CarouselProps extends Tag {
  children: React.ReactElement[];
  showDots?: boolean;
  showArrows?: boolean;
  arrowsProps?: ArrowProps;
  dotsProps?: DotsProps;
  disableSwipe?: boolean;
  initialActive?: number;
}

export type CarouselSliderProps = Tag & {
  children: React.ReactElement[];
  showArrows?: boolean;
  arrowsProps?: ArrowProps;
  itemsPerSlide?: number;
  itemsMinWidth?: number;
  disableSwipe?: boolean;
  initialActive?: number;
};

export type UseCarouselHook = (
  initialActive?: number,
  disableSwipe?: boolean
) => {
  carouselRef: React.RefObject<HTMLDivElement>;
  scrollToIndex: CarouselScrollToIndex;
  scrollToPrevFrame: CarouselScrollToPrevFrame;
  scrollToNextFrame: CarouselScrollToNextFrame;

  active: number;
  setActive: (idx: number) => void;

  isPressing: boolean;
};

export type UseWindowSizeSize = {
  width: number | undefined;
  height: number | undefined;
};

export type CarouselRef = {
  scrollToIndex: CarouselScrollToIndex;
  active: number;
};

export type CarouselSliderRef = {
  scrollToNextFrame: CarouselScrollToNextFrame;
  scrollToPrevFrame: CarouselScrollToPrevFrame;
  scrollToIndex: CarouselScrollToIndex;
  active: number;
};

export interface CarouselItemProps {
  active: number;
  len: number;
}

export interface DotsProps {
  className?: Tag["className"];
  activeClassName?: Tag["className"];

  size?: number;
  color?: CSSProperties["color"];
  hoverColor?: CSSProperties["color"];
  activeColor?: CSSProperties["color"];
}

export interface ArrowProps {
  className?: React.HTMLAttributes<HTMLElement>["className"];
  disabledClassName?: React.HTMLAttributes<HTMLElement>["className"];

  color?: CSSProperties["color"];
  bg?: CSSProperties["color"];

  arrowIcon?: React.ReactNode;
  size?: ArrowSize;
}

export type ArrowSize = "sm" | "md" | "lg";

export interface CarouselDotsProps extends DotsProps, CarouselItemProps {
  scrollToIndex: CarouselScrollToIndex;
}
export interface CarouselArrowProps extends ArrowProps, CarouselItemProps {
  scrollToNextFrame: CarouselScrollToNextFrame;
  scrollToPrevFrame: CarouselScrollToPrevFrame;
}

export type CarouselScrollToIndex = (index: number) => void;
export type CarouselScrollToNextFrame = (itemsPerSlide?: number) => void;
export type CarouselScrollToPrevFrame = (itemsPerSlide?: number) => void;
