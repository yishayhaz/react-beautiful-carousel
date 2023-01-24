# react-beautiful-carousel

🔗 [Codesandbox Example](https://codesandbox.io/s/vigorous-smoke-90k9er?file=/src/App.js)

## Code Example
```js
<Carousel showArrows showDots className="custom-class">
  <CarouselItem  className="custom-class-item">
    <div>1</div>
  </CarouselItem>
  <CarouselItem  className="custom-class-item">
    <div>2</div>
  </CarouselItem>
  <CarouselItem  className="custom-class-item">
    <div>3</div>
  </CarouselItem>
</Carousel>
```

```css
.custom-class {
  width: 500px;
  height: 200px;
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

| **props**  | **type**                          | **description**                                      | **default** |
|------------|-----------------------------------|------------------------------------------------------|-------------|
| children   | React.ReactElement[]              | an array of `CarouselItem`                           | []          |
| showArrows | boolean                           | will show the (horizontal) arrows                    | false       |
| showDots   | boolean                           | will show the dots to easily navigate between items  | false       |
| ...rest    | React.HTMLAttributes<HTMLElement> | any other valid HTML attribute.                      | undefind    |

## CarouselItem

| **props** | **type**                           | **description**                | **default** |
|-----------|------------------------------------|--------------------------------|-------------|
| children  | React.ReactNode                    | any jsx elements               | undefind    |
| ...rest   | React.HTMLAttributes<HTMLElement>  | any other valid HTML attribute.| undefind    |
