"use client";

import React, { useState } from 'react';
import { CompanyGridFilterButtons } from './CompanyGridFilterButtons';
import { CompanyGridFilterModal } from './CompanyGridFilterModal';
import { CompanyFilters } from '@/interfaces';

interface Props {
  filters: CompanyFilters;
  setFilters: React.Dispatch<React.SetStateAction<CompanyFilters>>;
  activityTypes: { id: string; name: string }[];
  clearFilters: () => void
}

export const CompanyGridFilter = ({ filters, setFilters, activityTypes, clearFilters }: Props) => {

  const [companyFilterModal, setCompanyFilterModal] = useState(false);

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
    <div className="rounded-xl border-2 border-slate-200 bg-white p-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

      <div className="flex flex-col sm:flex-row sm:gap-4 flex-grow">
        <input
          type="text"
          id="name"
          value={filters.name}
          onChange={e => handleInputChange('name', e.target.value)}
          className="w-full sm:w-full mb-2 sm:mb-0 rounded-md border bg-gray-50 border-gray-300 text-slate-800 px-2 py-1 text-sm shadow-sm outline-none"
        />
      </div>

      <CompanyGridFilterModal
        filters={filters}
        handleInputChange={handleInputChange}
        activityTypes={activityTypes}
        companyFilterModal={companyFilterModal}
        setCompanyFilterModal={setCompanyFilterModal}
      />

      <CompanyGridFilterButtons
        setCompanyFilterModal={setCompanyFilterModal}
        filters={filters}
        handleClearFilters={handleClearFilters}
      />
    </div>
  );
};
