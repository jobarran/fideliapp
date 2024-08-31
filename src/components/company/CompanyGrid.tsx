"use client"

import { ActivityType, Company } from "@/interfaces";
import { CompanyGridItem } from "./CompanyGridItem";
import { CompanyGridFilter } from "./CompanyGridFilter";
import { useCompanyFilter } from "@/hooks";

interface Props {
  companies: Company[];
  activityTypes: ActivityType[];
  search: string; // Add this line
}

export const CompanyGrid = ({ companies, activityTypes, search }: Props) => {
  // Pass `search` to `useCompanyFilter`
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
          />
        ))}
      </div>
    </>
  );
};
