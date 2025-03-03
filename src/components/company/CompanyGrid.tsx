"use client";

import { ActivityType, Company } from "@/interfaces";
import { CompanyGridItem } from "./CompanyGridItem";
import { FilterCompaniesComponent } from "../ui/filter/FilterCompaniesComponent";
import { useCompanyNameFilter } from "@/hooks/useCompanyNameFilter";
import { useEffect, useState } from "react";
import { useSortedCompanies } from "@/hooks/useSortedCompanies";
import { useCompaniesInRadius } from "@/hooks";
import { companiesInRadiusDistance } from "@/config";

interface Props {
  companies: Company[];
  activityTypes: ActivityType[];
  search: string;
  companyIdByUserCard: string[];
  activityType: string;
}

export const CompanyGrid = ({ companies, activityTypes, search, companyIdByUserCard, activityType }: Props) => {

  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const { filteredCompanies } = useCompaniesInRadius(companies, userLocation, companiesInRadiusDistance)
  const { filteredItems, filteredObj, filters, setFilters, clearFilters } = useCompanyNameFilter(filteredCompanies, search);
  const [sortBy, setSortBy] = useState<"rating" | "distance" | "">(""); // Default to "" for "no sorting"
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc"); // Default to high to low for rating, low to high for distance

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        () => {
          // Fallback to a default location if geolocation fails
          setUserLocation({ lat: 35.8799866, lng: 76.5048004 });
        }
      );
    } else {
      setUserLocation({ lat: 35.8799866, lng: 76.5048004 });
    }
  }, []);

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

  // Use the custom hook to get sorted companies
  const sortedCompanies = useSortedCompanies({
    companies: filteredItems as Company[],
    userLocation,
    sortBy,
    sortOrder,
  });

  return (
    <>
      <FilterCompaniesComponent
        filters={filters}
        setFilters={setFilters}
        clearFilters={clearFilters}
        activityTypes={activityTypes}
        setSortBy={setSortBy}
        sortBy={sortBy}
      />

      <div>
        {filteredObj === "company" ? (
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-5 mb-10 mt-4">
            {sortedCompanies.map((company: Company) => (
              <CompanyGridItem
                key={company.id}
                company={company}
                isInUserCards={companyIdByUserCard.includes(company.slug)}
                userLocation={userLocation}
              />
            ))}
          </div>
        ) : (
          <div className="w-full text-center italic mt-10 text-xs text-slate-400 mb-4 ">No hay resultados disponibles</div>
        )}
      </div>
    </>
  );
};
