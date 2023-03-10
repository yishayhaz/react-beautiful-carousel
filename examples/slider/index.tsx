import React from "react";
// import { Carousel, CarouselItem } from "react-beautiful-carousel";
// import "react-beautiful-carousel/style.css";
import { CarouselSlider, CarouselSliderItem } from "../../lib/src/slider";
import { CarouselSliderRef } from "../../lib/src/types";
import "../../lib/src/style.scss";
import "./style.css";

export default function App() {
  const ref = React.useRef<CarouselSliderRef | null>(null);

  return (
    <div className="App Slider">
      <div>
        <button
          onClick={() => {
            ref.current?.scrollToNextFrame();
          }}
        >
          +1
        </button>
        <button
          onClick={() => {
            ref.current?.scrollToPrevFrame();
          }}
        >
          -1
        </button>
      </div>
      <div className="wrraper">
        <CarouselSlider
          itemsPerSlide={5}
          itemsMinWidth={180}
          showArrows
          ref={ref}
        >
          {Array(300)
            .fill("")
            .map((_, i) => (
              <CarouselSliderItem key={i} className="custom-class-item">
                <div>{i}</div>
              </CarouselSliderItem>
            ))}
        </CarouselSlider>
      </div>
    </div>
  );
}
