import { Attrs } from "../types";
import { calculateDrag } from "./calculateDrag";
import { clampDrag } from "./clampDrag";
import { getAttr } from "./getAttr";
import { scrollChildrenTo } from "./scrollChildrenTo";
import { setAttr } from "./setAttr";

export const setDrag = (carousel: HTMLDivElement, pageX: number) => {
  const dragStartOffset = Number(getAttr(carousel, Attrs.dragStartOffset));
  const dragStartPageX = Number(getAttr(carousel, Attrs.dragStartPageX));

  const newDrag = clampDrag(
    carousel,
    calculateDrag(pageX, dragStartPageX, dragStartOffset)
  );

  scrollChildrenTo(carousel, newDrag);

  setAttr(carousel, Attrs.crrScrollOffset, newDrag.toString());
};
