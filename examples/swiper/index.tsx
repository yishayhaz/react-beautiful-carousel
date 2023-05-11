import React from "react";
// import { Carousel, CarouselItem } from "react-beautiful-carousel";
// import "react-beautiful-carousel/style.css";
import { Swiper, SwiperItem } from "../../lib/src/swiper";
import "../../lib/dist/style.css";
import "./style.css";

export default function App() {
  return (
    <div className="App Basic">
      <div className="wrraper">
        <Swiper showArrows showDots className="custom-class">
          <SwiperItem className="custom-class-item">
            <div>1</div>
          </SwiperItem>
          <SwiperItem className="custom-class-item">
            <div>2</div>
          </SwiperItem>
          <SwiperItem className="custom-class-item">
            <div>3</div>
          </SwiperItem>
        </Swiper>
      </div>
    </div>
  );
}
