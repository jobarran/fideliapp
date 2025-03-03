export const formatAddress = (address: string) => {
    console.log(address)
    if (!address) return "";
    const firstCommaIndex = address.indexOf(",");
    return firstCommaIndex !== -1 ? address.substring(0, firstCommaIndex) : address;
};