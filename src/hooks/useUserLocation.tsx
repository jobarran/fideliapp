import { useState, useEffect } from "react";

type Location = {
    lat: number;
    lng: number;
};

const useUserLocation = () => {
    const [userLocation, setUserLocation] = useState<Location | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const newLocation: Location = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    setUserLocation(newLocation);
                },
                (error) => {
                    console.error("Error getting user location:", error);
                    setError("No se pudo obtener la ubicación. Mostrando ubicación por defecto.");
                    const fallbackLocation: Location = {
                        lat: 35.8799866,
                        lng: 76.5048004,
                    };
                    setUserLocation(fallbackLocation);
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
        }
    }, []);

    return { userLocation, error };
};

export default useUserLocation;
