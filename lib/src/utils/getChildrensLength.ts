export const getChildrensLength = (children: HTMLElement | null) => {
  if (!children) return 0;
  return children.children.length;
};
