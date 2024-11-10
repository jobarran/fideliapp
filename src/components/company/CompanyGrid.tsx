"use client";

import { ActivityType, Company } from "@/interfaces";
import { CompanyGridItem } from "./CompanyGridItem";
import { FilterComponent } from '../ui/filter/FilterComponent';
import { useCompanyNameFilter } from "@/hooks/useCompanyNameFilter";
import { useEffect } from "react";

interface Props {
  companies: Company[];  // Enforced type for companies
  activityTypes: ActivityType[];
  search: string;
  companyIdByUserCard: string[];
  activityType: string;
}

export const CompanyGrid = ({ companies, activityTypes, search, companyIdByUserCard, activityType }: Props) => {

  const { filteredItems, filteredObj, filters, setFilters, clearFilters } = useCompanyNameFilter(companies, search);
console.log(activityTypes)
  const activityTypeId = activityType
    ? activityTypes.find((type) => type.name.toLowerCase() === activityType.toLowerCase())?.id
    : "";

  useEffect(() => {
    if (activityTypeId) {
      setFilters(prevFilters => ({
        ...prevFilters,
        activityTypeId: [activityTypeId], 
      }));
    }
  }, [activityTypeId, setFilters]);

  return (
    <>
      <FilterComponent
        filters={filters}
        setFilters={setFilters}
        clearFilters={clearFilters}
        activityTypes={activityTypes}
      />

      <div>
        {filteredObj === "company" ? (
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-5 mb-10 mt-4">
            {(filteredItems as Company[]).map((company: Company) => (
              <CompanyGridItem
                key={company.id}
                company={company}
                isInUserCards={companyIdByUserCard.includes(company.slug)}
              />
            ))}
          </div>
        ) : (
          <div className="w-full text-center italic mt-10">Sin resultados</div>
        )}
      </div>
    </>
  );
};
