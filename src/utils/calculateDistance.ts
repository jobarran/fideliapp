export const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const toRadians = (degree: number) => degree * (Math.PI / 180);
    const R = 6371.0088; // Earth's radius in kilometers

    const dLat = toRadians(lat2 - lat1);
    const dLng = toRadians(lng2 - lng1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = R * c * 1000; // Convert distance to meters

    if (distance < 1000) {
        const planarDistance = Math.sqrt(
            Math.pow((lat2 - lat1) * 111139, 2) +
            Math.pow((lng2 - lng1) * 111139 * Math.cos(toRadians(lat1)), 2)
        );
        distance = planarDistance;
    }

    return Math.round(distance); // Return distance in meters without decimals
};