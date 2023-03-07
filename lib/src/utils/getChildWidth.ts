export const getChildWidth = (elem: HTMLElement | null) => {
  if (!elem) return 0;

  const child = elem.children[0];

  if (!child) return 0;

  return child.clientWidth;
};
