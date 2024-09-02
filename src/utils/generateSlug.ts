export const generateSlug = (name: string, userId: string): string => {
    // Get the first 5 characters of the userId
    const idSegment = userId.slice(0, 5);

    // Replace spaces in the name with hyphens
    const formattedName = name.replace(/\s+/g, '-');

    // Concatenate the formatted name with the ID segment and convert to lowercase
    const result = `${formattedName}-${idSegment}`.toLowerCase();

    return result;
};
