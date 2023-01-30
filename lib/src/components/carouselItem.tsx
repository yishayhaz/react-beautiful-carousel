import React from "react";
import { Tag } from "../types";

export default function CarouselItem({ children, className, ...rest }: Tag) {
  return (
    <div className={`react-carousel__item ${className || ""}`} {...rest}>
      {children}
    </div>
  );
}
