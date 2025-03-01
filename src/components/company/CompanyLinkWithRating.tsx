'use client';

import { CompanyLink } from "..";
import { Company } from "@/interfaces";
import { FaStar, FaRegStar } from "react-icons/fa";

interface Props {
  company: Company;
  rating: number; // Assumes rating is between 1 and 5
}

export const CompanyLinkWithRating = ({ company, rating }: Props) => {
  // Generate an array of 5 stars, marking active stars based on the rating
  const stars = Array.from({ length: 5 }, (_, index) => index < rating);

  return (
    <div style={{ backgroundColor: "#F8F8F8" }}>
      <CompanyLink company={company} />
      <div className="flex items-center justify-center text-gray-600 mt-1">
        {stars.map((isActive, index) =>
          isActive ? (
            <FaStar key={index} className="h-5 w-5 mx-0.5 text-yellow-400" />
          ) : (
            <FaRegStar key={index} className="h-5 w-5 mx-0.5 text-slate-200" />
          )
        )}
      </div>
    </div>
  );
};
