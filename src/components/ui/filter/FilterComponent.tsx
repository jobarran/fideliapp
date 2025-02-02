"use client";

import React, { useState } from 'react';
import { ActivityType, CompanyFilters } from '@/interfaces';
import { FilterButtons, FilterModal } from '@/components';

interface Props {
  filters: CompanyFilters;
  setFilters: React.Dispatch<React.SetStateAction<CompanyFilters>>;
  activityTypes: ActivityType[];
  clearFilters: () => void
  customClassName: string
}

export const FilterComponent = ({ filters, setFilters, activityTypes, clearFilters, customClassName }: Props) => {

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
    <div className={`${customClassName}`}>

      <div className="flex flex-row flex-grow mr-2">
        <input
          type="text"
          id="name"
          placeholder="Buscar"
          value={filters.name}
          onChange={e => handleInputChange('name', e.target.value)}
          className="w-full rounded-md border bg-gray-50 border-gray-300 text-slate-800 px-2 py-1 text-sm outline-none"
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

      <FilterButtons
        setFilterModalData={setSetFilterModalData}
        filters={filters}
        handleClearFilters={handleClearFilters}
      />
    </div>
  );
};
