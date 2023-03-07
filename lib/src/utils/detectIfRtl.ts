export const detectIfRtl = (elem: HTMLElement | null = document.body) => {
  if (!elem) return 1;

  const style = window.getComputedStyle(elem);
  const direction = style.getPropertyValue("direction");

  return direction === "rtl" ? -1 : 1;
};
