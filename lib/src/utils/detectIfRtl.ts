export const detectIfRtl = (elem: HTMLElement = document.body) => {
  const style = window.getComputedStyle(elem);
  const direction = style.getPropertyValue("direction");

  return direction === "rtl";
};
