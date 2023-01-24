import React from "react";

export interface Tag extends React.HTMLAttributes<HTMLDivElement> {}

export interface CarouselProps extends Tag {
  children: React.ReactElement[];
  hideDots?: boolean;
  hideArrows?: boolean;
}
