import React from "react";
// import { Carousel, CarouselItem } from "react-beautiful-carousel";
// import "react-beautiful-carousel/style.css";
import { CarouselSlider, CarouselSliderItem } from "../../lib/src/slider";
import "../../lib/src/style.scss";
import "./style.css";

export default function App() {
  return (
    <div className="App">
      <div className="wrraper">
        <CarouselSlider itemsPerSlide={3}>
          {Array(10)
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
