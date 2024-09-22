"use client";

import React, { createContext, useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface MapContextType {
  isLoaded: boolean;
}

export const MapContext = createContext<MapContextType>({ isLoaded: false });

const MapInitializer = ({ children }: { children: React.ReactNode }) => {
  
    const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API!,
      version: 'weekly',
      libraries: ['marker'], 
    });

    loader
      .load()
      .then(() => {
        console.log('Google Maps API loaded');
        setIsLoaded(true); // Set the loaded state to true
      })
      .catch((error) => {
        console.error('Error loading Google Maps API', error);
        setIsLoaded(false); // Ensure the app knows if loading fails
      });
  }, []);

  return (
    <MapContext.Provider value={{ isLoaded }}>
      {children}
    </MapContext.Provider>
  );
};

export default MapInitializer;
