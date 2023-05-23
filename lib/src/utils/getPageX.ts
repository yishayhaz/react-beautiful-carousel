export const getPageX = (e: MouseEvent | TouchEvent) => {
  return e instanceof MouseEvent ? e.pageX : e.touches[0].pageX;
};
