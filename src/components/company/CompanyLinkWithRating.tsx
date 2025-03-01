'use client';

import { CompanyLink } from "..";
import { Company } from "@/interfaces";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

interface Props {
  company: Company;
  rating: number; // Assumes rating is between 0 and 5
}

export const CompanyLinkWithRating = ({ company, rating }: Props) => {
  // Generate an array of 5 elements to represent stars
  const stars = Array.from({ length: 5 }, (_, index) => {
    if (rating >= index + 1) return "full"; // Full star
    if (rating >= index + 0.5) return "half"; // Half star
    return "empty"; // Empty star
  });

  return (
    <div style={{ backgroundColor: "#F8F8F8" }}>
      <CompanyLink company={company} />
      <div className="flex items-center justify-center text-gray-600 mt-1">
        {stars.map((star, index) => {
          if (star === "full") {
            return <FaStar key={index} className="h-5 w-5 mx-0.5 text-yellow-400" />;
          }
          if (star === "half") {
            return <FaStarHalfAlt key={index} className="h-5 w-5 mx-0.5 text-yellow-400" />;
          }
          return <FaRegStar key={index} className="h-5 w-5 mx-0.5 text-slate-200" />;
        })}
      </div>
    </div>
  );
};
