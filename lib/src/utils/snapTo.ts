import { Attrs } from "../types";
import { scrollChildrenTo } from "./scrollChildrenTo";
import { setAttr } from "./setAttr";

export const snapTo = (carousel: HTMLDivElement, value: number) => {
  setAttr(carousel, Attrs.crrScrollOffset, value.toString());
  scrollChildrenTo(carousel, value);
};
