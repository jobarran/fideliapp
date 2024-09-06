"use client"

import { ActivityType, Company } from "@/interfaces";
import { CompanyGridItem } from "./CompanyGridItem";
import { CompanyGridFilter } from "./CompanyGridFilter";
import { useCompanyFilter } from "@/hooks";

interface Props {
  companies: Company[];
  activityTypes: ActivityType[];
  search: string;
  companyIdByUserCard: string[]
}

export const CompanyGrid = ({ companies, activityTypes, search, companyIdByUserCard }: Props) => {

  const { filteredCompanies, filters, setFilters, clearFilters } = useCompanyFilter(companies, search);

  return (
    <>
      <CompanyGridFilter
        filters={filters}
        setFilters={setFilters}
        clearFilters={clearFilters}
        activityTypes={activityTypes}
      />

      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 gap-5 mb-10 mt-4">
        {filteredCompanies.map(company => (
          <CompanyGridItem
            key={company.id}
            company={company}
            isInUserCards={companyIdByUserCard.includes(company.slug)} // Pass true if company.id is in companyIdByUserCard, false otherwise
          />
        ))}
      </div>
    </>
  );
};
