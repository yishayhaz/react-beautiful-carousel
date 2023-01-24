import React from "react";
import ReactDOM from "react-dom/client";
import BasicExample from "../examples/basic";
import "../lib/src/style.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BasicExample />
  </React.StrictMode>
);
