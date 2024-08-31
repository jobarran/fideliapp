"use client"

import { Company } from "@/interfaces";
import { CompanyGridItem } from "./CompanyGridItem";
import { CompanyGridFilter } from "./CompanyGridFilter";
import { useCompanyFilter } from "@/hooks";

interface Props {
  companies: Company[];
  activityTypes: { id: string; name: string }[];
}


export const CompanyGrid = ({ companies, activityTypes }: Props) => {

  const { filteredCompanies, filters, setFilters, clearFilters } = useCompanyFilter(companies);

  return (
    <>
      <CompanyGridFilter
        filters={filters}
        setFilters={setFilters}
        clearFilters={clearFilters}
        activityTypes={activityTypes}
      />

      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 gap-5 mb-10 mt-4">
        {
          filteredCompanies.map(company => (
            <CompanyGridItem
              key={company.id}
              company={company}
            />
          ))
        }

      </div>
    </>
  );
};