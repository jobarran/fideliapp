'use client';

import { CompanyLink, UserDistance } from "..";
import { Company } from "@/interfaces";

interface Props {
  company: Company;
  distance: number;
}

export const CompanyWithRating = ({ company, distance }: Props) => {
  return (
    <div style={{ backgroundColor: '#F8F8F8' }}>
      <CompanyLink company={company} />
      <UserDistance distance={distance} />
    </div>
  );
};
