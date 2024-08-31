import { MdOutlineFilterList, MdOutlineFilterListOff } from 'react-icons/md';
import React from 'react';
import { CompanyFilters } from '@/interfaces';

interface Props {
  filters: CompanyFilters;
  handleClearFilters: () => void;
  setCompanyFilterModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CompanyGridFilterButtons = ({ filters, handleClearFilters, setCompanyFilterModal }: Props) => {
  // Check if any filters are applied
  const isAnyFilterApplied = filters.name !== '' || filters.activityTypeId.length > 0;

  return (
    <div className="flex justify-center gap-2">
      <div className="relative inline-flex w-fit">
        <button
          className="flex items-center p-1 rounded-lg border-2 hover:bg-gray-200 focus:outline-none"
          onClick={() => setCompanyFilterModal(true)}
        >
          <p className='text-sm text-slate-800 hidden sm:block'>Filtros</p>
          <MdOutlineFilterList className="w-5 h-5 text-gray-600 ml-1" aria-hidden="true" />
        </button>
        {isAnyFilterApplied && (
          <span className="absolute top-0.5 right-0.5 grid min-h-[12px] min-w-[12px] translate-x-2/4 -translate-y-2/4 place-items-center rounded-full bg-slate-800 py-1 px-1 text-xs text-white"></span>
        )}
      </div>
      <button
        className="flex items-center p-1 rounded-lg border-2 hover:bg-gray-200 focus:outline-none"
        onClick={handleClearFilters}
      >
        <p className='text-sm text-slate-800 hidden sm:block'>Borrar filtros</p>
        <MdOutlineFilterListOff className="w-5 h-5 text-gray-600 ml-1" aria-hidden="true" />
      </button>
    </div>
  );
};
