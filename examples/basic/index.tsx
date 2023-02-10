import React from "react";
// import { Carousel, CarouselItem } from "react-beautiful-carousel";
// import "react-beautiful-carousel/style.css";
import { Carousel, CarouselItem } from "../../lib/dist";
import "../../lib/dist/style.css";
import "./style.css";

export default function App() {
  return (
    <div className="App">
      <div className="wrraper">
        <Carousel
          showArrows
          showDots
          className="custom-class"
          // dotsProps={{
          //   color: "red",
          //   activeColor: "blue",
          //   hoverColor: "green",
          // }}
          // arrowsProps={{
          //   color: "red",
          // }}
        >
          <CarouselItem className="custom-class-item">
            <div>1</div>
          </CarouselItem>
          <CarouselItem className="custom-class-item">
            <div>2</div>
          </CarouselItem>
          <CarouselItem className="custom-class-item">
            <div>3</div>
          </CarouselItem>
        </Carousel>
      </div>
    </div>
  );
}
