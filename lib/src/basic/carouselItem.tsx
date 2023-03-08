import React from "react";
import { Tag } from "../types";

export const CarouselItem = ({ children, className, ...rest }: Tag) => {
  return (
    <div {...rest} className={`react-carousel__item ${className || ""}`}>
      {children}
    </div>
  );
};
