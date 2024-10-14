/**
 * Function to convert a hex color to a hex color string that indicates 50% opacity.
 * @param {string} hex - The hex color code (e.g., '#RRGGBB' or '#RGB').
 * @returns {string} - The hex color code with an indication of 50% opacity.
 */
export const softColor = (hex: string, percent: number): string => {

      // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, '');

  // Parse the hex color
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Calculate the lighter color
  r = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)));
  g = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)));
  b = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)));

  // Convert back to hex
  const newHex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;

  return newHex;
}
