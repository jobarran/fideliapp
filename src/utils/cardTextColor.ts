// Function to determine if a color is light or dark
export const cardTextColor = (color: string) => {
    // Remove the hash if it's there
    color = color.replace("#", "");

    // Convert the color to RGB
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);

    // Calculate the luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Return true if the color is light, false if it's dark
    return luminance > 0.5;
};
