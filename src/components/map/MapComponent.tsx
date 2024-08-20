/* 
Since the map was loaded on client side, 
we need to make this component client rendered as well else error occurs
*/
'use client'

//Map component Component from library
import { GoogleMap } from "@react-google-maps/api";
import { useEffect, useState } from "react";

//Map's styling
export const defaultMapContainerStyle = {
    width: '100%',
    height: '70vh',
    borderRadius: '10px 10px 10px 10px',
};

// Define a type for user location
type Location = {
    lat: number;
    lng: number;
};

const MapComponent = () => {

    const [userLocation, setUserLocation] = useState<Location | null>(null);
    const [error, setError] = useState<string | null>(null);

    const defaultMapZoom = 16;

    // Custom map style to hide restaurants and places
    const mapStyles = [
        {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
        },
        {
            featureType: 'transit',
            elementType: 'all',
            stylers: [
                { visibility: 'off' }
            ]
        }
    ];

    const defaultMapOptions = {
        zoomControl: true,
        tilt: 0,
        gestureHandling: 'auto',
        mapTypeId: 'roadmap',
        disableDefaultUI: true, // Disable all default UI controls
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        },
        mapTypeControl: false, // Hide the map type control
        fullscreenControl: false, // Hide fullscreen control if needed
        streetViewControl: false, // Hide street view control if needed
        styles: mapStyles // Apply custom style
    };

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
                    // Fall back to a default location if needed
                    const fallbackLocation: Location = {
                        lat: 35.8799866,
                        lng: 76.5048004,
                    };
                    setUserLocation(fallbackLocation);
                },
                {
                    enableHighAccuracy: true, // Request high accuracy
                    timeout: 5000, // Timeout in milliseconds
                    maximumAge: 0 // Prevent cached location
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
            setError("Geolocalización no soportada por el navegador. Mostrando ubicación por defecto.");
            // Fall back to a default location if needed
            const fallbackLocation: Location = {
                lat: 35.8799866,
                lng: 76.5048004,
            };
            setUserLocation(fallbackLocation);
        }
    }, []);

    return (


        <div>
            <div className="flex mt-4 justify-between items-center">
                <p className="text-xl text-gray-900">Negocios cercanos</p>
                <p className="text-base text-gray-900 cursor-pointer">Ver todos</p>

            </div>
            <div className='w-full mt-2 mb-2'>
                {userLocation && (
                    <GoogleMap
                        mapContainerStyle={defaultMapContainerStyle}
                        center={userLocation}
                        zoom={defaultMapZoom}
                        options={defaultMapOptions}
                    >
                    </GoogleMap>
                )}
            </div>
        </div>




    )
};

export { MapComponent };