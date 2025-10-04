let canvas: HTMLCanvasElement | null = null;

export function getTextWidth(text: string, font: string) {
  // re-use canvas object for better performance
  if (!canvas) canvas = document.createElement("canvas");

  const context = canvas.getContext("2d");
  context!.font = font;
  const metrics = context!.measureText(text);
  return metrics.width;
}

export function getCssStyle(element: Element, prop: string) {
  return window.getComputedStyle(element, null).getPropertyValue(prop);
}

export function getCanvasFont(el = document.body) {
  const fontWeight = getCssStyle(el, "font-weight") || "normal";
  const fontSize = getCssStyle(el, "font-size") || "16px";
  const fontFamily = getCssStyle(el, "font-family") || "Times New Roman";

  return `${fontWeight} ${fontSize} ${fontFamily}`;
}
