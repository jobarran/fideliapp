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
    const [userLocation, setUserLocation] = useState<Location | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [userDistance, setUserDistance] = useState<string | number>("-");

    useEffect(() => {
        const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
            const toRadians = (degree: number) => degree * (Math.PI / 180);
            const R = 6371.0088; // Earth's radius in kilometers

            // Convert latitude and longitude differences to radians
            const dLat = toRadians(lat2 - lat1);
            const dLng = toRadians(lng2 - lng1);

            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
                Math.sin(dLng / 2) * Math.sin(dLng / 2);

            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            let distance = R * c * 1000; // Convert distance to meters

            // If distance is very small (below 1 km), use a planar approximation
            if (distance < 1000) {
                const planarDistance = Math.sqrt(
                    Math.pow((lat2 - lat1) * 111139, 2) +  // Approx. meters per degree latitude
                    Math.pow((lng2 - lng1) * 111139 * Math.cos(toRadians(lat1)), 2)  // Adjust for latitude
                );
                distance = planarDistance;
            }

            return distance;
        };

        if (!companyLocation || companyLocation.lat == null || companyLocation.lng == null) {
            setUserDistance("-");
            return;
        }

        const { lat: companyLat, lng: companyLng } = companyLocation;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const newLocation: Location = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    setUserLocation(newLocation);

                    // Calculate distance in meters
                    const distance = calculateDistance(
                        newLocation.lat,
                        newLocation.lng,
                        companyLat!,
                        companyLng!
                    );
                    setUserDistance(distance.toFixed(0));
                },
                (error) => {
                    console.error("Error getting user location:", error);
                    setError("No se pudo obtener la ubicación. Mostrando ubicación por defecto.");
                    const fallbackLocation: Location = {
                        lat: 35.8799866,
                        lng: 76.5048004,
                    };
                    setUserLocation(fallbackLocation);

                    const distance = calculateDistance(
                        fallbackLocation.lat,
                        fallbackLocation.lng,
                        companyLat!,
                        companyLng!
                    );
                    setUserDistance(distance.toFixed(0));
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0,
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
            setError("Geolocalización no soportada por el navegador. Mostrando ubicación por defecto.");
            const fallbackLocation: Location = {
                lat: 35.8799866,
                lng: 76.5048004,
            };
            setUserLocation(fallbackLocation);

            const distance = calculateDistance(
                fallbackLocation.lat,
                fallbackLocation.lng,
                companyLat!,
                companyLng!
            );
            setUserDistance(distance.toFixed(0));
        }
    }, [companyLocation]);

    return { userLocation, userDistance, error };
};

export default useUserLocation;
