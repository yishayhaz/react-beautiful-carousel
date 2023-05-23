import { scrollTo } from "./scrollTo";

export const scrollChildrenTo = (elem: HTMLElement, value: number) => {
  const children = Array.from(elem.children) as HTMLElement[];

  if (!children?.length) return;

  children.forEach((child) => {
    scrollTo(child, value);
  });
};
