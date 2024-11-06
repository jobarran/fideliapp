'use client'

import createMarkerContent from '@/utils/createMarkerContent';
import React, { useEffect, useRef } from 'react';

type CustomMarkerProps = {
    position: { lat: number; lng: number };
    map: google.maps.Map | null; // Ensure the map object is passed as a prop
    onClick: () => void;
};

const CompanyMarker: React.FC<CustomMarkerProps> = ({ position, map, onClick }) => {

    const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);

    useEffect(() => {
        async function initializeMarker() {
            // Ensure the Google Maps API is loaded
            if (typeof google === 'undefined') {
                console.error("Google Maps API is not loaded.");
                return;
            }

            // Directly access AdvancedMarkerElement from the google object
            const AdvancedMarkerElement = google.maps.marker.AdvancedMarkerElement;

            if (!AdvancedMarkerElement) {
                console.error("AdvancedMarkerElement is not available.");
                return;
            }

            // Use createMarkerContent to generate the content element
            const content = createMarkerContent("#1E293B");

            // Create a new AdvancedMarkerElement
            const marker = new AdvancedMarkerElement({
                map,
                position,
                content: content, // Use the content from createMarkerContent
            });

            // Save the reference to the marker
            markerRef.current = marker;

            // Add click listener
            marker.addListener('click', onClick);

            // Cleanup function
            return () => {
                if (markerRef.current) {
                    markerRef.current.map = null;
                    markerRef.current = null;
                }
            };
        }

        initializeMarker();
    }, [map, position, onClick]);

    return null;
};

export default CompanyMarker;
