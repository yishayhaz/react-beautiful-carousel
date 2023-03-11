export const setChildrensMinWidth = (
  parent: HTMLElement,
  itemsPerSlide: number
) => {
  const width = parent.offsetWidth / itemsPerSlide;

  for (const child of parent.children) {
    (child as HTMLElement).style.minWidth = `${width}px`;
  }
};
