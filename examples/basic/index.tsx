import React from "react";
import { Carousel, CarouselItem } from "../../lib";
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
                <div
                  style={{
                    height: "100%",
                    border: "1px solid black",
                  }}
                >
                  {i}
                </div>
              </CarouselItem>
            ))}
        </Carousel>
      </div>
    </div>
  );
}
