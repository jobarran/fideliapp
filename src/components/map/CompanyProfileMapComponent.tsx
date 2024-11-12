'use client';

import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { useCallback, useRef, useState } from "react";
import { CompanyMarker } from "..";

export const defaultProfileMapContainerStyle = {
    width: '100%',
    height: '40vh',
    borderRadius: '10px',
};

type Location = {
    lat: number;
    lng: number;
};

interface Props {
    companyLocation: Location;
    companyName: string
}

export const CompanyProfileMapComponent = ({ companyLocation, companyName }: Props) => {
    const defaultMapZoom = 17;
    const mapRef = useRef<google.maps.Map | null>(null);
    const [mapZoom, setMapZoom] = useState(defaultMapZoom); // Initialize state for zoom level
    const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);

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

    const onMapLoad = useCallback((map: google.maps.Map) => {
        mapRef.current = map;
        setMapInstance(map); // Ensure the mapInstance state is updated

        // Add a listener to track zoom changes
        map.addListener('zoom_changed', () => {
            const zoom = map.getZoom();
            if (zoom !== undefined) {
                setMapZoom(zoom); // Update the zoom level state only if it is defined
            }
        });
    }, []);

    return (
        <div>
            <GoogleMap
                mapContainerStyle={defaultProfileMapContainerStyle}
                center={companyLocation}
                zoom={defaultMapZoom}
                options={defaultMapOptions}
                onLoad={onMapLoad} // Use callback here
            >
                <div style={{ position: 'relative' }}>
                    <CompanyMarker
                        map={mapInstance}
                        position={companyLocation}
                        onClick={() => { }}
                        label={companyName}
                    />

                </div>
            </GoogleMap>
        </div>
    );
};

