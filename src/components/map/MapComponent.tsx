'use client';

import { GoogleMap, InfoWindowF } from "@react-google-maps/api";
import { useRef, useState, useCallback } from "react";
import CompanyMarker from "./CompanyMarker";
import useUserLocation from "@/hooks/useUserLocation"; // Import the custom hook
import { CompanyLocation } from "@/interfaces";

// Map's styling
export const defaultMapContainerStyle = {
    width: '100%',
    height: '40vh',
    borderRadius: '10px 10px 10px 10px',
};

interface Props {
    companyLocation: CompanyLocation[]
}

const MapComponent = ({companyLocation}:Props) => {
    const { userLocation, error } = useUserLocation(); // Use the custom hook
    const [selectedPlace, setSelectedPlace] = useState<{ lat: number; lng: number; name: string } | null>(null);
    const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);

    const mapRef = useRef<google.maps.Map | null>(null); // Create a reference for the map

    const defaultMapZoom = 15;

    const defaultMapOptions: google.maps.MapOptions = {
        zoomControl: true,
        tilt: 0,
        gestureHandling: 'auto',
        mapTypeId: 'roadmap',
        disableDefaultUI: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM,
        },
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        mapId: '234bd0d65671fea1',
    };

    const handleMarkerClick = (place: { lat: number; lng: number; name: string }) => {
        setSelectedPlace(place);
    };

    const onMapLoad = useCallback((map: google.maps.Map) => {
        mapRef.current = map;
        setMapInstance(map); // Ensure the mapInstance state is updated
    }, []);

    return (
        <div>
            <div className="flex mt-4 justify-between items-center">
                <p className="text-lg text-gray-900">Negocios cercanos</p>
                <p className="text-sm text-gray-900 cursor-pointer">Ver todos</p>
            </div>
            <div className='w-full mt-2 mb-2'>
                {error && <p className="text-red-500">{error}</p>}
                {userLocation && (
                    <GoogleMap
                        mapContainerStyle={defaultMapContainerStyle}
                        center={userLocation}
                        zoom={defaultMapZoom}
                        options={defaultMapOptions}
                        onLoad={onMapLoad} // Use callback here
                    >
                        {mapInstance && companyLocation.map((location, index) => (
                            <CompanyMarker
                                key={index}
                                map={mapInstance} // Pass the map instance here
                                position={{ lat: location.lat, lng: location.lng }}
                                onClick={() => handleMarkerClick(location)}
                            />
                        ))}
                        {selectedPlace && (
                            <InfoWindowF
                                position={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
                                onCloseClick={() => setSelectedPlace(null)}
                            >
                                <div>
                                    <h3 className="text-lg font-semibold">{selectedPlace.name}</h3>
                                    <p>Details about {selectedPlace.name}</p>
                                </div>
                            </InfoWindowF>
                        )}
                    </GoogleMap>
                )}
            </div>
        </div>
    );
};

export { MapComponent };
