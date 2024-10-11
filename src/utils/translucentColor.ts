export const translucentColor = (color: string, selectedColor: string): string => {
    return color !== selectedColor ? '0.3' : '1';
};