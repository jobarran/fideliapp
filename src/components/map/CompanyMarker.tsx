'use client'

import createMarkerContent from '@/utils/createMarkerContent';
import React, { useEffect, useRef } from 'react';

type CustomMarkerProps = {
    position: { lat: number; lng: number };
    map: google.maps.Map | null; // Ensure the map object is passed as a prop
    onClick: () => void;
    label: string | undefined
};

const CompanyMarker: React.FC<CustomMarkerProps & { mapZoom: number }> = ({ position, map, onClick, mapZoom, label }) => {

    const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);

    useEffect(() => {
        async function initializeMarker() {
            if (typeof google === 'undefined') {
                console.error("Google Maps API is not loaded.");
                return;
            }

            const AdvancedMarkerElement = google.maps.marker.AdvancedMarkerElement;
            if (!AdvancedMarkerElement) {
                console.error("AdvancedMarkerElement is not available.");
                return;
            }

            // Toggle label based on zoom level
            const showLabel = mapZoom >= 17;
            const content = createMarkerContent("#1E293B", label, showLabel);

            const marker = new AdvancedMarkerElement({
                map,
                position,
                content: content,
            });

            markerRef.current = marker;
            marker.addListener('click', onClick);

            return () => {
                if (markerRef.current) {
                    markerRef.current.map = null;
                    markerRef.current = null;
                }
            };
        }

        initializeMarker();
    }, [map, position, onClick, mapZoom]);

    return null;
};

export default CompanyMarker;
