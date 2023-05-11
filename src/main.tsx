import React from "react";
import ReactDOM from "react-dom/client";
import SliderExample from "../examples/slider";
import BasicExample from "../examples/basic";
import SwiperExample from "../examples/swiper";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BasicExample />
    <SwiperExample />
    <BasicExample />
    <SliderExample />
  </React.StrictMode>
);
