// Tilt effects only make sense with a mouse; on touch screens they track the
// gyroscope and re-render constantly, which makes scrolling janky.
const canTilt =
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default canTilt;
