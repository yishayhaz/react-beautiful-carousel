export const clampDrag = (carousel: HTMLDivElement, value: number) => {
  const { offsetWidth } = carousel;

  const halfWidth = offsetWidth / 2;

  return Math.max(halfWidth, Math.min(value, halfWidth));
};
