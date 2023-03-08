import React, { useEffect, useState } from "react";
import { CarouselArrowProps } from "../types";
import { detectIfRtl } from "../utils";
import { ArrowIcon } from "../assets/arrow";

export default function CarouselArrows({
  active,
  len,
  scrollTo,
  className,
  color,
  bg,
  arrowIcon = <ArrowIcon />,
}: CarouselArrowProps) {
  const [isRtl, setIsRtl] = useState(false);

  useEffect(() => {
    setIsRtl(detectIfRtl());
  }, []);

  return (
    <div>
      <button
        aria-label={`Go to next slide`}
        onClick={() => scrollTo(active - 1)}
        className={`react-carousel__arrow ${isRtl ? "--right" : "--left"} ${
          className || ""
        }`}
        disabled={active === 0}
        style={
          {
            "--arrow-color": color,
            "--arrow-bg": bg,
          } as React.CSSProperties
        }
      >
        {arrowIcon}
      </button>
      <button
        aria-label={`Go to previous slide`}
        onClick={() => scrollTo(active + 1)}
        className={`react-carousel__arrow ${isRtl ? "--left" : "--right"} ${
          className || ""
        }`}
        disabled={active === len - 1}
        style={
          {
            "--arrow-color": color,
            "--arrow-bg": bg,
          } as React.CSSProperties
        }
      >
        {arrowIcon}
      </button>
    </div>
  );
}
