"use client";

import { useMemo, useState, useEffect, useContext } from 'react';
import { useCombobox } from 'downshift';
import { boldUserText } from '@/utils';
import { SearchErrorMessage } from './SearchErrorMessage';
import { MapContext } from './MapInitializer';

// Define types for the autocomplete suggestion
interface Suggestion {
  id: string;
  name: {
    string: string;
    length: number;
    offset: number;
  };
  address: {
    string: string;
    length: number;
    offset: number;
  };
}

interface SearchResult {
  autocompleteSuggestions: Suggestion[];
  status: string;
}

export const SearchBox = () => {
  // Explicitly type the searchResult state
  const [searchResult, setSearchResult] = useState<SearchResult>({
    autocompleteSuggestions: [],
    status: '',
  });

  // Access isLoaded from the MapContext to check if Google Maps API is available
  const { isLoaded } = useContext(MapContext);

  // Store the AutocompleteService instance
  const [service, setService] = useState<google.maps.places.AutocompleteService | null>(null);

  // Initialize the AutocompleteService once the Google Maps API is loaded
  useEffect(() => {
    if (isLoaded && window.google) {
      setService(new window.google.maps.places.AutocompleteService());
    }
  }, [isLoaded]); // Depend on isLoaded

  // Create a session token using useMemo
  const sessionToken = useMemo(() => {
    if (isLoaded && window.google) {
      return new window.google.maps.places.AutocompleteSessionToken();
    }
    return null;
  }, [isLoaded]);

  // Configure the useCombobox hook for managing input and suggestions
  const {
    getInputProps,
    getItemProps,
    getMenuProps,
  } = useCombobox({
    items: searchResult.autocompleteSuggestions,
    onInputValueChange: ({ inputValue }) => {
      // Handle input value change
      if (inputValue === '' || !service || !sessionToken) {
        setSearchResult({
          autocompleteSuggestions: [],
          status: '',
        });
        return;
      }

      // Fetch autocomplete predictions using the Google Maps service
      service.getPlacePredictions(
        {
          input: inputValue,
          sessionToken: sessionToken,
        },
        handlePredictions
      );

      function handlePredictions(
        predictions: google.maps.places.AutocompletePrediction[] | null,
        status: string
      ) {
        if (status === 'OK' && predictions) {
          const autocompleteSuggestions: Suggestion[] = predictions.map((prediction) => ({
            id: prediction.place_id,
            name: {
              string: prediction.structured_formatting.main_text,
              length: prediction.structured_formatting.main_text_matched_substrings[0]?.length || 0,
              offset: prediction.structured_formatting.main_text_matched_substrings[0]?.offset || 0,
            },
            address: {
              string: prediction.structured_formatting.secondary_text || '',
              length: prediction.structured_formatting.main_text_matched_substrings[0]?.length || 0,
              offset: prediction.structured_formatting.main_text_matched_substrings[0]?.offset || 0,
            },
          }));
          setSearchResult({
            autocompleteSuggestions,
            status: 'OK',
          });
        } else {
          setSearchResult({
            autocompleteSuggestions: [],
            status,
          });
        }
      }
    },
  });

  return (
    <>
      <input type="search" {...getInputProps()} placeholder="Search for places..." />
      <ul {...getMenuProps()}>
        {searchResult.autocompleteSuggestions.length > 0
          ? searchResult.autocompleteSuggestions.map((item, index) => (
              <li key={item.id} {...getItemProps({ item, index })}>
                <p dangerouslySetInnerHTML={{ __html: boldUserText(item.name) }} />
                <p dangerouslySetInnerHTML={{ __html: boldUserText(item.address) }} />
              </li>
            ))
          : null}
      </ul>
      <SearchErrorMessage status={searchResult.status} />
    </>
  );
};
