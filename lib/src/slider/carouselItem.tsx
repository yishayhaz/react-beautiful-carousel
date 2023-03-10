import React from "react";
import { CarouselSliderItemProps } from "../types";

export const CarouselSliderItem = ({
  children,
  className,
  ...rest
}: CarouselSliderItemProps) => {
  return (
    <div {...rest} className={`react-carousel__item ${className || ""}`}>
      {children}
    </div>
  );
};
