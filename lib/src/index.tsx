import React, { useRef, useState, useEffect } from "react";
import { Tag, CarouselProps } from "./types";
import { detectIfRtl } from "./utils";

function Carousel({
  children,
  showArrows,
  showDots,
  className,
  ...rest
}: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [active, _setActive] = useState(0);

  const scrollByIndex = (i: number) => {
    if (i < 0) i = 0;
    if (i > children.length - 1) i = children.length - 1;

    _setActive(i);
  };

  const scrollByDir = (dir: string = "left") => {
    const isRtl = detectIfRtl(carouselRef.current);

    if (dir === "left") {
      scrollByIndex(active - 1 * isRtl);
    } else {
      scrollByIndex(active + 1 * isRtl);
    }
  };

  const scroll = (i: number) => {
    const width = getChildWidth();

    if (!carouselRef.current) return;

    const isRtl = detectIfRtl(carouselRef.current);

    carouselRef.current.scrollLeft = width * isRtl * i;
  };

  useEffect(() => {
    scroll(active);
  }, [active]);

  const getChildWidth = () => {
    const child = carouselRef.current?.children[0];

    if (!child) return 0;

    return child.clientWidth;
  };

  return (
    <div className={`react-carousel__wrraper ${className || ""}`} {...rest}>
      <div ref={carouselRef} className={`react-carousel`}>
        {children}
      </div>

      {!showDots ? null : (
        <div className="react-carousel__dots">
          {children.map((_, i) => (
            <button
              onClick={() => scrollByIndex(i)}
              className={active === i ? "--active" : ""}
              key={i}
            ></button>
          ))}
        </div>
      )}

      {!showArrows ? null : (
        <>
          <button
            onClick={() => scrollByDir("left")}
            className="react-carousel__arrow --left"
          >
            {"<"}
          </button>
          <button
            onClick={() => scrollByDir("right")}
            className="react-carousel__arrow --right"
          >
            {">"}
          </button>
        </>
      )}
    </div>
  );
}

function CarouselItem({ children, className, ...rest }: Tag) {
  return (
    <div className={`react-carousel__item ${className || ""}`} {...rest}>
      {children}
    </div>
  );
}

export { Carousel, CarouselItem };
