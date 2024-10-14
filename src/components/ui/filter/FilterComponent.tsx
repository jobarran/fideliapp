"use client";

import React, { useState } from 'react';
import { ActivityType, CompanyFilters } from '@/interfaces';
import { FilterButtons, FilterModal } from '@/components';

interface Props {
  filters: CompanyFilters;
  setFilters: React.Dispatch<React.SetStateAction<CompanyFilters>>;
  activityTypes: ActivityType[];
  clearFilters: () => void
}

export const FilterComponent = ({ filters, setFilters, activityTypes, clearFilters }: Props) => {

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

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-2 flex flex-row items-center justify-between gap-2">

      <div className="flex flex-row flex-grow">
        <input
          type="text"
          id="name"
          value={filters.name}
          onChange={e => handleInputChange('name', e.target.value)}
          className="w-full rounded-md border bg-gray-50 border-gray-300 text-slate-800 px-2 py-1 text-sm shadow-sm outline-none"
        />
      </div>

      <FilterModal
        filters={filters}
        handleInputChange={handleInputChange}
        activityTypes={activityTypes}
        filterModalData={filterModalData}
        setFilterModalData={setSetFilterModalData}
      />

      <FilterButtons
        setFilterModalData={setSetFilterModalData}
        filters={filters}
        handleClearFilters={handleClearFilters}
      />
    </div>
  );
};
