import React from "react";

export const detectIfRtl = (elem: HTMLElement | null = document.body) => {
  if (!elem) return 1;

  const style = window.getComputedStyle(elem);
  const direction = style.getPropertyValue("direction");

  return direction === "rtl" ? -1 : 1;
};

export const getChildWidth = (elem: HTMLElement | null) => {
  if (!elem) return 0;

  const child = elem.children[0];

  if (!child) return 0;

  return child.clientWidth;
};
