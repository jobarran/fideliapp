export const hoverColor = (bgColor: string): string => {
    // Extract the number from the tailwind class, e.g., 800 from "bg-slate-800"
    const colorMatch = bgColor.match(/(\d{3})$/);
    const colorValue = colorMatch ? parseInt(colorMatch[0]) : 500; // Default to 500 if no match

    // Calculate the hover color number
    const hoverColorValue = colorValue >= 800 ? colorValue - 200 : colorValue + 200;

    // Construct and return the hover color class dynamically
    return `hover:${bgColor.replace(/\d{3}$/, hoverColorValue.toString())}`;
};