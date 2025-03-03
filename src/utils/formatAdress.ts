export const formatAddress = (address: string) => {
    if (!address) return "";
    const firstCommaIndex = address.indexOf(",");
    return firstCommaIndex !== -1 ? address.substring(0, firstCommaIndex) : address;
};