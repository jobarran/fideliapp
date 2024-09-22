"use client";

import { GoogleMap } from "@react-google-maps/api";
import { useEffect, useState, useRef, useCallback, useContext } from "react";
import { MapContext } from "./MapInitializer"; // Adjust the path if necessary
import useUserLocation from "@/hooks/useUserLocation";
import CompanyMarker from "./CompanyMarker";

const defaultMapContainerStyle = {
    width: '100%',
    height: '40vh',
    borderRadius: '10px',
};

interface CreateCompanyMapComponentProps {
    markerPosition: google.maps.LatLng | null;
    setMapCenter: (position: google.maps.LatLng | null) => void; // New prop for updating map center
}

const CreateCompanyMapComponent = ({ markerPosition, setMapCenter }: CreateCompanyMapComponentProps) => {
    const { isLoaded } = useContext(MapContext);
    const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
    const mapRef = useRef<google.maps.Map | null>(null);
    const { userLocation, error } = useUserLocation();

    const defaultMapOptions: google.maps.MapOptions = {
        zoomControl: true,
        tilt: 0,
        gestureHandling: 'auto',
        mapTypeId: 'roadmap',
        disableDefaultUI: true,
        mapId: '234bd0d65671fea1',
    };

    const onMapLoad = useCallback((map: google.maps.Map) => {
        mapRef.current = map;
        setMapInstance(map);
        if (markerPosition) {
            map.panTo(markerPosition); // Zoom to the initial marker position
        }
    }, [markerPosition]);

    useEffect(() => {
        if (mapInstance && markerPosition) {
            mapInstance.panTo(markerPosition); // Zoom to the new marker position
            mapInstance.setZoom(15); // Set zoom level
            setMapCenter(markerPosition); // Update the center in the parent component
        }
    }, [markerPosition, mapInstance, setMapCenter]);

    return (
        <div>
            <div className='w-full'>
                {isLoaded && userLocation && (
                    <GoogleMap
                        mapContainerStyle={defaultMapContainerStyle}
                        center={userLocation}
                        zoom={15}
                        options={defaultMapOptions}
                        onLoad={onMapLoad}
                    >
                        {markerPosition && (
                            <CompanyMarker
                                map={mapInstance}
                                position={markerPosition.toJSON()}
                                onClick={() => { }} // Handle marker click if needed
                            />
                        )}
                    </GoogleMap>
                )}
            </div>
        </div>
    );
};

export { CreateCompanyMapComponent };
