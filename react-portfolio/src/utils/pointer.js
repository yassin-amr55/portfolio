export function isHoverCapable() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}
