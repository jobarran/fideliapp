"use client";

import { useState } from 'react';
import { CreateCompanyMapComponent, CreateCompanySearchBox } from '..';

interface Props {
    setAddress: (address: string) => void;
    setLat: (address: number) => void;
    setLng: (address: number) => void;
}

export const CreateCompanyMapContainer = ({ setAddress, setLat, setLng }: Props) => {

    const [markerPosition, setMarkerPosition] = useState<google.maps.LatLng | null>(null);

    const handleSetMarkerPosition = (position: google.maps.LatLng | null) => {
        setMarkerPosition(position);
        if (position) {
            setLat(position.lat());
            setLng(position.lng());
        } else {
            setLat(0);
            setLng(0);
        }
    };

    return (
        <div>
            <CreateCompanySearchBox
                setMarkerPosition={handleSetMarkerPosition}
                setMapCenter={setMarkerPosition} // Assuming you want to center the map too
                setAddress={setAddress} // Pass setAddress to get the selected address
            />
            <CreateCompanyMapComponent
                markerPosition={markerPosition}
                setMapCenter={setMarkerPosition} // Assuming you want to center the map too
            />
        </div>
    );
};
