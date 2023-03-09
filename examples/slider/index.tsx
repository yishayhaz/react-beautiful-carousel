import React from "react";
// import { Carousel, CarouselItem } from "react-beautiful-carousel";
// import "react-beautiful-carousel/style.css";
import { CarouselSlider, CarouselSliderItem } from "../../lib/src/slider";
import "../../lib/src/style.scss";
import "./style.css";

export default function App() {
  const ref = React.useRef(null);

  return (
    <div className="App Slider">
      <button
        onClick={() => {
          ref.current?.scrollTo(0);
        }}
      >
        custom slider! +1
      </button>
      <div className="wrraper">
        <CarouselSlider itemsPerSlide={5} showArrows ref={ref}>
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
