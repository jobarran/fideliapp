export const cropText = (text: string, length: number): string => {
    // Check if the text length exceeds the specified limit
    if (text.length > length) {
        // Crop the text and add "..." at the end
        return text.substring(0, length) + "..";
    }
    // Return the original text if it doesn't exceed the limit
    return text;
};
