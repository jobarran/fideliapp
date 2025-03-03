import { useEffect, useState } from "react";
import { Reward } from "@/interfaces";

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
    return R * c * 1000; // Convert distance to meters
};

const shuffleArray = (array: Reward[]) => {
    return array
        .map((item) => ({ item, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ item }) => item);
};

const useCompanyRewardDistance = (rewards: Reward[]) => {
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [filteredRewards, setFilteredRewards] = useState<Reward[]>([]);
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
            const nearbyRewards = rewards.filter((reward) => {
                if (reward.companyLat !== undefined && reward.companyLng !== undefined) {
                    const distance = calculateDistance(
                        userLocation.lat,
                        userLocation.lng,
                        reward.companyLat,
                        reward.companyLng
                    );
                    return distance <= 10000; // Filter within 10,000 meters
                }
                return false;
            });

            setFilteredRewards(shuffleArray(nearbyRewards)); // Randomize the filtered rewards
            setIsLoading(false);
        }
    }, [userLocation, rewards]);

    return { filteredRewards, isLoading };
};

export default useCompanyRewardDistance;
