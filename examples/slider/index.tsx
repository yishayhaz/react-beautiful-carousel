import React from "react";
// import { Carousel, CarouselItem } from "react-beautiful-carousel";
// import "react-beautiful-carousel/style.css";
import { CarouselSlider, CarouselSliderItem } from "../../lib/dist/slider";
import "../../lib/dist/style.css";
import "./style.css";

export default function App() {
  return (
    <div className="App Slider">
      <div className="wrraper">
        <CarouselSlider itemsPerSlide={5}>
          {Array(22)
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
