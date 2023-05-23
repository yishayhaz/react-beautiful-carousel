import { setAttr } from "./setAttr";

export const setChildrenAttr = (
  elem: HTMLElement,
  attr: string,
  value: string
) => {
  const children = Array.from(elem.children) as HTMLElement[];

  if (!children?.length) return;

  children.forEach((child) => {
    setAttr(child, attr, value);
  });
};
