export const calculateDrag = (
  pageX: number,
  dragStartPageX: number,
  dragStartOffset: number
) => {
  return pageX - dragStartPageX + dragStartOffset;
};
