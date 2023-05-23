import { detectIfRtl } from "./detectIfRtl";

export const clampDrag = (carousel: HTMLDivElement, value: number) => {
  const { offsetWidth, scrollWidth } = carousel;

  const halfWidth = offsetWidth / 2;

  if (detectIfRtl(carousel)) {
    return Math.min(scrollWidth - halfWidth, Math.max(value, -halfWidth));
  }

  return Math.max(-scrollWidth + halfWidth, Math.min(value, halfWidth));
};
