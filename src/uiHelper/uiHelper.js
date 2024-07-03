export function isColorLight(color) {
  let r, g, b;
  
  if (color.startsWith('#')) {
    const hex = color.replace('#', '');
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  } else if (color.startsWith('rgb')) {
    [r, g, b] = color.match(/\d+/g).map(Number);
  } else {
    return false;
  }

  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 128;
}


const hexToRgba = (hex, opacity) => {
  let r = 0, g = 0, b = 0;

  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }

  return `rgba(${r},${g},${b},${opacity})`;
};

// Function to create overlay
export const createOverlay = (color, opacity = 0.7) => {
  let overlayColor;

  if (color.startsWith('#')) {
    overlayColor = hexToRgba(color, opacity);
  } else if (color.startsWith('rgb')) {
    overlayColor = color.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
  } else {
    throw new Error('Invalid color format');
  }
  return overlayColor;
};

export const convertStringToRupees = (rupees) => {
  if(!rupees) {
    return;
  }
  return `Rs.${rupees}`;
};

export const convertDiscountText = (discount) => {
  if(!discount) {
    return;
  }
  return `(${discount}% off)`;
};
