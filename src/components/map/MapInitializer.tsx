'use client'
// src/components/map/MapInitializer.tsx

import { useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const MapInitializer = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API!,
            version: 'weekly',
            libraries: ["marker"]
        });

        loader.load().then(() => {
            console.log('Google Maps API loaded');
        }).catch((error) => {
            console.error('Error loading Google Maps API', error);
        });
    }, []);

    return <>{children}</>;
};

export default MapInitializer;
