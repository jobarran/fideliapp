import { useEffect, useState } from "react";
import { Company } from "@/interfaces";

// Utility to calculate distance
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

// Custom hook for calculating distances to all companies
const useClosestCompanies = (companies: Company[]) => {
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [closestCompanies, setClosestCompanies] = useState<{ company: Company; distance: number }[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lng: longitude });
                },
                () => {
                    // Fallback to a default location if geolocation fails
                    setUserLocation({ lat: 35.8799866, lng: 76.5048004 });
                }
            );
        } else {
            setUserLocation({ lat: 35.8799866, lng: 76.5048004 }); // Default location if geolocation is not supported
        }
    }, []);

    useEffect(() => {
        if (userLocation) {
            // Calculate distances and filter closest companies
            const distances = companies
                .filter((company) => company.lat !== null && company.lng !== null) // Ensure coordinates are not null
                .map(company => ({
                    company,
                    distance: calculateDistance(userLocation.lat, userLocation.lng, company.lat!, company.lng!) // Use non-null assertion since we've filtered null values
                }))
                .filter(({ distance }) => distance <= 9999); // Filter out companies that are more than 9999 meters away

            // Sort companies by distance (ascending) and return the 15 closest
            const sortedDistances = distances.sort((a, b) => a.distance - b.distance).slice(0, 15);

            setClosestCompanies(sortedDistances);  // Set closest companies
            setIsLoading(false);
        }
    }, [userLocation, companies]);

    return { closestCompanies, isLoading };
};

export default useClosestCompanies;
