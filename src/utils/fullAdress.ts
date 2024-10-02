export const fullAdress = (adress: string): string | undefined => {

    const fullAddress = adress;
    const match = fullAddress.match(/^([^,]+),\s*([A-Z0-9]+)\b/);

    if (match) {
        const formattedAddress = `${match[1]}, ${match[2]}`;
        return formattedAddress
    } else {
        console.error("Address format not recognized");
        return undefined
    }

}