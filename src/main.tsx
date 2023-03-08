import React from "react";
import ReactDOM from "react-dom/client";
import SliderExample from "../examples/slider";
import BasicExample from "../examples/basic";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BasicExample />
    <SliderExample />
  </React.StrictMode>
);
