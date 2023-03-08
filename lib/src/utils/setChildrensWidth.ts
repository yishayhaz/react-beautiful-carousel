export const setChildrensMinWidth = (elem: HTMLElement, width: number) => {
  Array.from(elem.children).forEach((child) => {
    (child as HTMLElement).style.minWidth = `${width}%`;
  });
};
