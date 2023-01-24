import React from "react";
import { Carousel, CarouselItem } from "../../lib/src";
import "./style.css";

export default function BasicExample() {
  return (
    <div className="App">
      <div>
        <Carousel>
          {Array(3)
            .fill("")
            .map((_, i) => (
              <CarouselItem key={i}>
                <div>{i}</div>
              </CarouselItem>
            ))}
        </Carousel>
      </div>
    </div>
  );
}
