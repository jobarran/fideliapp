import { Company } from '@/interfaces';
import { useMemo } from 'react';

interface UserLocation {
  lat: number;
  lng: number;
}

export const useCompaniesInRadius = (
  companies: Company[],
  userLocation: UserLocation | null,
  meters: number
): Company[] => {
  // Haversine formula to calculate distance between two coordinates
  const calculateDistance = (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ): number => {
    const R = 6371000; // Earth radius in meters
    const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
    
    const dLat = toRadians(lat2 - lat1);
    const dLng = toRadians(lng2 - lng1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  return useMemo(() => {
    if (!userLocation) return []; // Return empty array if user location is null

    const { lat: userLat, lng: userLng } = userLocation;

    return companies.filter(company => {
      if (company.lat === null || company.lng === null) return false;
      
      const distance = calculateDistance(
        userLat,
        userLng,
        company.lat,
        company.lng
      );
      return distance <= meters;
    });
  }, [companies, userLocation, meters]);
};
