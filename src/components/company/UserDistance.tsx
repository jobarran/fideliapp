'use client';

import { FaMapMarkerAlt } from 'react-icons/fa';
import { Company } from "@/interfaces";

interface Props {
  distance: number;
}

export const UserDistance = ({ distance }: Props) => {
  return (
    <div className="flex items-center justify-center text-gray-600 mt-2">
      <FaMapMarkerAlt className="mr-1 text-xs" />
      <p className="text-xs">{distance} meters</p> {/* Display distance in meters */}
    </div>
  );
};
