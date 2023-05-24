# react-beautiful-carousel

🔗 [Codesandbox Example](https://codesandbox.io/s/vigorous-smoke-90k9er?file=/src/App.js)

## Code Example

`App.js`

```js
import React from "react";
import { Carousel, CarouselItem } from "react-beautiful-carousel";
import "react-beautiful-carousel/style.css";
import "./style.css";

export default function App() {
  return (
    <div className="App">
      <div className="wrraper">
        <Carousel showArrows showDots className="custom-class">
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
```

`style.css`

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.App {
  height: 100vh;
  background-color: #f5f5f5;

  display: grid;
  place-items: center;
}

.wrraper {
  width: 500px;
  height: 200px;
}

/* Note:  you can use the default classNames, check it in the devtool */
.custom-class {
  border: 2px solid red;
}

.custom-class-item {
  height: 100%;
  font-size: 3rem;

  display: grid;
  place-items: center;

  border: 1px solid black;
}
```

## Carousel

| **props**     | **type**                          | **description**                                     | **default** |
| ------------- | --------------------------------- | --------------------------------------------------- | ----------- |
| children      | React.ReactElement[]              | an array of `CarouselItem`                          | []          |
| showArrows    | boolean                           | will show the (horizontal) arrows                   | false       |
| arrowsProps   | CarouselArrowProps                | customize arrows by colors, classes, etc            | false       |
| showDots      | boolean                           | will show the dots to easily navigate between items | false       |
| dotsProps     | CarouselDotsProps                 | customize dots by colors, size, classes, etc        | false       |
| initialActive | number?                           | set first active frame                              | 0           |
| disableSwipe  | boolean?                          | if true, the carousel won't be swipable             | false       |
| ...rest       | React.HTMLAttributes<HTMLElement> | any other valid HTML attribute.                     | undefind    |

## CarouselItem

| **props** | **type**                          | **description**                 | **default** |
| --------- | --------------------------------- | ------------------------------- | ----------- |
| children  | React.ReactNode                   | any jsx elements                | undefind    |
| ...rest   | React.HTMLAttributes<HTMLElement> | any other valid HTML attribute. | undefind    |

## CarouselSlider

| **props**     | **type**                          | **description**                          | **default** |
| ------------- | --------------------------------- | ---------------------------------------- | ----------- |
| children      | React.ReactElement[]              | an array of `CarouselItem`               | []          |
| showArrows    | boolean                           | will show the (horizontal) arrows        | false       |
| arrowsProps   | CarouselArrowProps                | customize arrows by colors, classes, etc | false       |
| initialActive | number?                           | set first active frame                   | 0           |
| disableSwipe  | boolean?                          | if true, the carousel won't be swipable  | false       |
| ...rest       | React.HTMLAttributes<HTMLElement> | any other valid HTML attribute.          | undefind    |
