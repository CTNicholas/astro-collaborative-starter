import { isServer } from './isServer'

export function contrastingTextColor (col) {
  if (isServer()) {
    return false
  }

  return getColor(hexToRgb(standardize_color(col)))
}

function getColor({ r, g, b }) {
  if (r && g && b) {
    var isLight = 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return isLight < 0.5;
  }
  return false;
}

function standardize_color(str){
  var ctx = document.createElement('canvas').getContext('2d');
  ctx.fillStyle = str;
  return ctx.fillStyle;
}

function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
