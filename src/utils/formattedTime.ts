export const formattedTime = (dateString: string): string => {
    const date = new Date(dateString);

    // Extract the hours and minutes
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Return the formatted time as HH:MM
    return `${hours}:${minutes}`;
};