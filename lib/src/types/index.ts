import React, { CSSProperties } from "react";

export interface Tag extends React.HTMLAttributes<HTMLElement> {}

export interface CarouselProps extends Tag {
  children: React.ReactElement[];
  showDots?: boolean;
  showArrows?: boolean;
  arrowsProps?: ArrowProps;
  dotsProps?: DotsProps;
}

export interface CarouselItemProps {
  active: number;
  length: number;
  scrollTo: (index: number) => void;
}

export interface DotsProps {
  className?: React.HTMLAttributes<HTMLElement>["className"];
  activeClassName?: React.HTMLAttributes<HTMLElement>["className"];

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
}

export interface CarouselDotsProps extends DotsProps, CarouselItemProps {}
export interface CarouselArrowProps extends ArrowProps, CarouselItemProps {}
