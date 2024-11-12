import { useState, useEffect } from "react";

type Location = {
    lat: number;
    lng: number;
};

type CompanyLocation = {
    lat: number | null;
    lng: number | null;
};

const useUserLocation = (companyLocation?: CompanyLocation) => {
    const [userLocation, setUserLocation] = useState<Location>({
        lat: -34.603722, // Buenos Aires latitude
        lng: -58.381592, // Buenos Aires longitude
    });
    const [error, setError] = useState<string | null>(null);
    const [userDistance, setUserDistance] = useState<string | number>("-");

    const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
        const toRadians = (degree: number) => degree * (Math.PI / 180);
        const R = 6371.0088; // Earth's radius in kilometers

        const dLat = toRadians(lat2 - lat1);
        const dLng = toRadians(lng2 - lng1);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c * 1000; // Convert distance to meters

        return distance;
    };

    useEffect(() => {
        const handleLocationUpdate = (location: Location) => {
            setUserLocation(location);

            if (companyLocation && companyLocation.lat != null && companyLocation.lng != null) {
                const distance = calculateDistance(
                    location.lat,
                    location.lng,
                    companyLocation.lat,
                    companyLocation.lng
                );
                setUserDistance(distance.toFixed(0));
            } else {
                setUserDistance("-");
            }
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const location = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    handleLocationUpdate(location);
                },
                (error) => {
                    console.error("Error getting user location:", error);
                    setError("No se pudo obtener la ubicación. Mostrando ubicación por defecto.");
                    handleLocationUpdate({
                        lat: -34.603722, // Default fallback (Buenos Aires)
                        lng: -58.381592,
                    });
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0,
                }
            );
        } else {
            setError("Geolocalización no soportada por el navegador.");
            handleLocationUpdate({
                lat: -34.603722, // Default fallback (Buenos Aires)
                lng: -58.381592,
            });
        }
    }, [companyLocation]);

    return { userLocation, userDistance, error };
};

export default useUserLocation;
