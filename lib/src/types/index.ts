import React from "react";

export interface Tag extends React.HTMLAttributes<HTMLElement> {}

export interface CarouselProps extends Tag {
  children: React.ReactElement[];
  showDots?: boolean;
  showArrows?: boolean;
}
