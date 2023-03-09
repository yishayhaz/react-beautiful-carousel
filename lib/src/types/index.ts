import React, { CSSProperties } from "react";

export interface Tag extends React.HTMLAttributes<HTMLElement> {}

export type CarouselSlider = React.ForwardRefRenderFunction<
  HTMLDivElement,
  CarouselSliderProps
>;

export interface CarouselProps extends Tag {
  children: React.ReactElement[];
  showDots?: boolean;
  showArrows?: boolean;
  arrowsProps?: ArrowProps;
  dotsProps?: DotsProps;
}

export type CarouselSliderProps = Tag & {
  children: React.ReactElement[];
  showArrows?: boolean;
  arrowsProps?: ArrowProps;
  itemsPerSlide?: number;
};

export interface CarouselItemProps {
  active: number;
  len: number;
  scrollTo: (index: number) => void;
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

export interface CarouselDotsProps extends DotsProps, CarouselItemProps {}
export interface CarouselArrowProps extends ArrowProps, CarouselItemProps {}
