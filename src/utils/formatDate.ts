export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    // Extract the day, month, and year
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year

    // Return the formatted date as DD/MM/YY
    return `${day}/${month}/${year}`;
};