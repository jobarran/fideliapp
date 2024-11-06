'use client';

import { GoogleMap, InfoWindowF } from "@react-google-maps/api";
import { useRef, useState, useCallback } from "react";
import CompanyMarker from "./CompanyMarker";
import useUserLocation from "@/hooks/useUserLocation"; // Import the custom hook
import { CompanyLocation } from "@/interfaces";
import { SliderHeader } from "../ui/slider/SliderHeader";
import { CompanyLinkImage } from "../company/CompanyLinkImage";
import { Avatar } from "..";
import Link from "next/link";
import { IoCloseSharp } from 'react-icons/io5';

// Map's styling
export const defaultMapContainerStyle = {
    width: '100%',
    height: '40vh',
    borderRadius: '10px 10px 10px 10px',
};

interface Props {
    companyLocation: CompanyLocation[]
}

const MapComponent = ({ companyLocation }: Props) => {
    const defaultMapZoom = 15; // Declare defaultMapZoom here
    const { userLocation, error } = useUserLocation(); // Use the custom hook
    const [selectedPlace, setSelectedPlace] = useState<{
        lat: number;
        lng: number;
        name: string;
        slug: string;
        activityType: string;
        logoUrl: string;
    } | null>(null);
    const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
    const [mapZoom, setMapZoom] = useState(defaultMapZoom); // Initialize state for zoom level

    const mapRef = useRef<google.maps.Map | null>(null); // Create a reference for the map


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

    const handleMarkerClick = (place: CompanyLocation) => {
        setSelectedPlace({
            lat: place.lat,
            lng: place.lng,
            name: place.name,
            activityType: place.activityType,
            logoUrl: place.logoUrl,
            slug: place.slug
        });
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
        <>
            {/* Global style to hide the default close button */}
            <style jsx global>{`
                .gm-style-iw button[title="Close"] {
                    display: none !important; /* Hide the default close button */
                }
            `}</style>
            <div>
                <SliderHeader label={'Negocios cercanos'} href={'/companies'} seeAllLabel={'Ver todos'} />
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
                                <div key={index} style={{ position: 'relative' }}>
                                    <CompanyMarker
                                        map={mapInstance}
                                        position={{ lat: location.lat, lng: location.lng }}
                                        onClick={() => handleMarkerClick(location)}
                                        label={location.name}
                                    />

                                </div>
                            ))}
                            {selectedPlace && (
                                <InfoWindowF
                                    position={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
                                    onCloseClick={() => setSelectedPlace(null)}
                                >
                                    <div className="relative flex flex-col items-center min-w-32">
                                        {/* Custom Close Button */}
                                        <button
                                            onClick={() => setSelectedPlace(null)}
                                            className="absolute top-0 right-0 text-gray-500 hover:text-gray-700 rounded"
                                        >
                                            <IoCloseSharp size={16} /> {/* Use smaller icon */}
                                        </button>

                                        {/* Logo */}
                                        <div className="relative mb-2 w-12 h-12 rounded-full overflow-hidden bg-white">
                                            {selectedPlace.logoUrl ? (

                                                <CompanyLinkImage
                                                    src={selectedPlace.logoUrl}
                                                    alt={selectedPlace.name}
                                                    className="object-cover"
                                                    width={0}
                                                    height={0}
                                                    style={{ width: '100%', height: '100%' }}
                                                />
                                            ) : (
                                                <Avatar name={selectedPlace.name} size={'12'} backgroundColor={null} className={'border-2'} />
                                            )}
                                        </div>

                                        {/* Name Link */}
                                        <Link href={`/companies/${selectedPlace.slug}`}>
                                            <h3 className="text-lg text-slate-600 font-medium cursor-pointer transition duration-200 ease-in-out transform hover:text-slate-800 hover:font-semibold">
                                                {selectedPlace.name}
                                            </h3>
                                        </Link>
                                        <p className="text-sm text-gray-600">{selectedPlace.activityType}</p>
                                    </div>
                                </InfoWindowF>
                            )}
                        </GoogleMap>
                    )}
                </div>
            </div>
        </>
    );
};

export { MapComponent };
