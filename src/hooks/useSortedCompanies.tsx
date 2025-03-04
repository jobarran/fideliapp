import { useState, useEffect } from "react";
import { Company } from "@/interfaces";

interface UseSortedCompaniesProps {
    companies: Company[];
    userLocation: { lat: number; lng: number } | null;
    sortBy: "rating" | "distance" | "";  // Allow empty string for "no sorting"
    sortOrder: "asc" | "desc";
}

export const useSortedCompanies = ({
    companies,
    userLocation,
    sortBy,
    sortOrder,
}: UseSortedCompaniesProps) => {
    // Function to calculate distance between two points (Haversine formula)
    const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
        const R = 6371; // Radius of the Earth in km
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLng = (lng2 - lng1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in km
        return distance;
    };

    // Don't sort initially
    const [sortedCompanies, setSortedCompanies] = useState(companies);

    useEffect(() => {
        if (sortBy === "") {
            setSortedCompanies(companies); // No sorting applied
        } else {
            const sorted = [...companies];
            if (sortBy === "rating") {
                sorted.sort((a, b) => {
                    return sortOrder === "desc" ? b.averageRating - a.averageRating : a.averageRating - b.averageRating;
                });
            } else if (sortBy === "distance" && userLocation) {
                sorted.sort((a, b) => {
                    const distanceA = a.lat && a.lng ? calculateDistance(userLocation.lat, userLocation.lng, a.lat, a.lng) : Infinity;
                    const distanceB = b.lat && b.lng ? calculateDistance(userLocation.lat, userLocation.lng, b.lat, b.lng) : Infinity;
                    return sortOrder === "asc" ? distanceB - distanceA : distanceA - distanceB;
                });
            }
            setSortedCompanies(sorted);
        }
    }, [companies, sortBy, sortOrder, userLocation]);

    return sortedCompanies;
};
