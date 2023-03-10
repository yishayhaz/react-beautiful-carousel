export const getOptimalItemsPerSlide = (
  parent: HTMLElement,
  itemsPerSlide: number,
  itemsMinWidth?: number
) => {
  if (!itemsMinWidth) return itemsPerSlide;

  const parentWidth = parent.offsetWidth;

  if (parentWidth >= itemsPerSlide * itemsMinWidth) {
    return itemsPerSlide;
  }

  return Math.floor(parentWidth / itemsMinWidth);
};
