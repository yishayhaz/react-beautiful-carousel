export const getChildWidth = (elem: HTMLElement) => {
  const child = elem.children[0];

  if (!child) return 0;

  return (child as HTMLElement).offsetWidth;
};
