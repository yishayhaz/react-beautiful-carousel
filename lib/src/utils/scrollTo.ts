import { setAttr } from "./setAttr";

export const scrollTo = (elem: HTMLElement, value: number) => {
  setAttr(elem, "style", `translate: ${value}px`);
};
