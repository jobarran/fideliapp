"use client";

import { useState, useContext } from 'react';
import { useCombobox } from 'downshift';
import { MapContext } from './MapInitializer';

interface Suggestion {
  id: string;
  address: string; // Simplified to just hold the address
}

interface CreateCompanySearchBoxProps {
  setMarkerPosition: (position: google.maps.LatLng | null) => void;
  setMapCenter: (center: google.maps.LatLng | null) => void; // Existing prop
  setAddress: (address: string) => void; // New prop
}

export const CreateCompanySearchBox = ({ setMarkerPosition, setMapCenter, setAddress }: CreateCompanySearchBoxProps) => {
  const [searchResult, setSearchResult] = useState<Suggestion[]>([]);
  const { isLoaded } = useContext(MapContext);

  const {
    getInputProps,
    getItemProps,
    getMenuProps,
    isOpen,
    inputValue,
    setInputValue,
  } = useCombobox({
    items: searchResult,
    onInputValueChange: ({ inputValue }) => {
      if (inputValue === '') {
        setSearchResult([]);
        return;
      }

      const geocoder = new window.google.maps.Geocoder();

      geocoder.geocode({ address: inputValue }, (results, status) => {
        if (status === 'OK' && results && results.length > 0) {
          const addresses: Suggestion[] = results.map(result => ({
            id: result.place_id || '',
            address: result.formatted_address || '',
          }));
          setSearchResult(addresses);
        } else {
          setSearchResult([]);
        }
      });
    },
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        setInputValue(selectedItem.address);
        const geocoder = new window.google.maps.Geocoder();

        geocoder.geocode({ address: selectedItem.address }, (results, status) => {
          if (status === 'OK' && results && results.length > 0) {
            const location = results[0].geometry.location;
            setMarkerPosition(new window.google.maps.LatLng(location.lat(), location.lng()));
            setMapCenter(new window.google.maps.LatLng(location.lat(), location.lng())); // Update map center
            setAddress(selectedItem.address); // Set the selected address
          } else {
            console.error('Geocode was not successful for the following reason: ' + status);
          }
        });
      }
    },
  });

  return (
    <div className="relative mb-4">
      <input
        type="search"
        {...getInputProps()}
        placeholder="Search for addresses..."
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <ul
        {...getMenuProps()}
        className={`absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
         {/* If no search results and input is not empty, show the placeholder */}
        {searchResult.length === 0 && inputValue.trim().length > 0 && (
          <li className="p-2 text-gray-500">Escriba la dirección y la ciudad de su negocio</li>
        )}

        {searchResult.map((item, index) => (
          <li
            key={item.id}
            {...getItemProps({ item, index })}
            className="p-2 hover:bg-blue-100 cursor-pointer"
          >
            <p>{item.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
