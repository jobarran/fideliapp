"use client";

import React, { useState } from 'react';
import { ActivityType, CompanyFilters } from '@/interfaces';
import { FilterButtons, FilterCompanyButtons, FilterModal } from '@/components';

interface Props {
    filters: CompanyFilters;
    setFilters: React.Dispatch<React.SetStateAction<CompanyFilters>>;
    activityTypes: ActivityType[];
    clearFilters: () => void;
    setSortBy: React.Dispatch<React.SetStateAction<"rating" | "distance" | "">>;  // Allow empty string as well
}

export const FilterCompaniesComponent = ({ filters, setFilters, activityTypes, clearFilters, setSortBy }: Props) => {
    const [filterModalData, setSetFilterModalData] = useState(false);

    const handleInputChange = (name: keyof CompanyFilters, value: string | string[]) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const handleClearFilters = () => {
        clearFilters();
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(event.target.value as "rating" | "distance" | ""); // Handle the change and set sorting option
    };

    return (
        <div className="rounded-md border border-slate-200 bg-white p-2 flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-2">
            <div className="flex flex-row w-full sm:flex-grow">
                <input
                    type="text"
                    id="name"
                    placeholder="Buscar"
                    value={filters.name}
                    onChange={e => handleInputChange('name', e.target.value)}
                    className="border px-3 py-2 rounded-md text-sm w-full focus:outline-none"
                />
            </div>

            <FilterModal
                filters={filters}
                handleInputChange={handleInputChange}
                handleClearFilters={handleClearFilters}
                activityTypes={activityTypes}
                filterModalData={filterModalData}
                setFilterModalData={setSetFilterModalData}
            />

            <FilterCompanyButtons
                setFilterModalData={setSetFilterModalData}
                filters={filters}
                handleClearFilters={handleClearFilters}
                handleSortChange={handleSortChange}
                setSortBy={setSortBy}
            />
        </div>
    );
};
