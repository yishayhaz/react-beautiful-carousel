import React from "react";
import { Tag } from "../types";

export function CarouselSliderItem({ children, className, ...rest }: Tag) {
  return (
    <div {...rest} className={`react-carousel__item ${className || ""}`}>
      {children}
    </div>
  );
}
