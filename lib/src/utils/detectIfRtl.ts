export const detectIfRtl = (elem: HTMLElement | null = document.body) => {
  if (!elem) return false;

  const style = window.getComputedStyle(elem);
  const direction = style.getPropertyValue("direction");

  return direction === "rtl";
};
