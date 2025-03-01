import { MdOutlineFilterList, MdOutlineFilterListOff, MdStar, MdLocationOn } from 'react-icons/md';
import React from 'react';
import { CompanyFilters } from '@/interfaces';

interface Props {
  filters: CompanyFilters;
  handleClearFilters: () => void;
  setFilterModalData: React.Dispatch<React.SetStateAction<boolean>>;
  handleSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  setSortBy: React.Dispatch<React.SetStateAction<"rating" | "distance" | "">>;
  sortBy: string
}

export const FilterCompanyButtons = ({ filters, handleClearFilters, setFilterModalData, handleSortChange, setSortBy, sortBy }: Props) => {
  // Check if any filters are applied
  const isAnyFilterApplied = filters.name !== '' || filters.activityTypeId.length > 0;

  return (
    <div className="flex justify-center gap-2 w-full sm:w-auto">

      {/* Sort Select Dropdown (Hidden on small screens) */}
      <div className="w-full sm:w-auto relative">

        <div className='sm:flex sm:flex-row hidden gap-2'>
          <select
            onChange={handleSortChange}
            value={filters.name ? filters.name : ""}  // Ensure proper value handling
            className="border px-3 py-2 rounded-md text-sm focus:outline-none w-full sm:w-auto"
          >
            <option value="">Ordenar por</option>
            <option value="rating">Mejor valoradas</option>
            <option value="distance">Más cercanos</option>
          </select>
          {/* Filter Button */}
          <div className="w-full sm:w-auto relative">
            <button
              className="flex items-center px-3 py-2 rounded-md border hover:bg-gray-200 focus:outline-none w-full"
              onClick={() => setFilterModalData(true)}
            >
              <p className="text-sm text-slate-800">Filtros</p>
              <MdOutlineFilterList className="w-5 h-5 text-gray-600 ml-1" aria-hidden="true" />
            </button>
            {isAnyFilterApplied && (
              <span className="absolute top-0.5 right-0.5 grid min-h-[12px] min-w-[12px] translate-x-2/4 -translate-y-2/4 place-items-center rounded-full bg-slate-800 py-1 px-1 text-xs text-white"></span>
            )}
          </div>

          {/* Clear Filters Button */}
          <button
            className="flex items-center px-3 py-2 rounded-md border hover:bg-gray-200 focus:outline-none"
            onClick={handleClearFilters}
          >
            <p className="text-sm text-slate-800 text-nowrap">Borrar filtros</p>
            <MdOutlineFilterListOff className="w-5 h-5 text-gray-600 ml-1" aria-hidden="true" />
          </button>
        </div>



        {/* Sort Icon for Small Screens */}
        <div className="sm:hidden flex gap-2 w-full">
          <button
            onClick={() => setSortBy("rating")}
            className={`flex items-center px-3 py-2 rounded-md border hover:bg-gray-200 focus:outline-none w-1/4 justify-center ${sortBy === 'rating' ? 'bg-gray-200' : ''}`}
            aria-label="Ordenar por mejor valoradas"
          >
            <MdStar className="w-5 h-5 text-gray-600" aria-hidden="true" />
          </button>

          <button
            onClick={() => setSortBy("distance")}
            className={`flex items-center px-3 py-2 rounded-md border hover:bg-gray-200 focus:outline-none w-1/4 justify-center ${sortBy === 'distance' ? 'bg-gray-200' : ''}`}
            aria-label="Ordenar por más cercanos"
          >
            <MdLocationOn className="w-5 h-5 text-gray-600" aria-hidden="true" />
          </button>

          <button
            onClick={() => setFilterModalData(true)}
            className="flex items-center px-3 py-2 rounded-md border hover:bg-gray-200 focus:outline-none w-1/4 justify-center"
            aria-label="Mostrar filtros"
          >
            <MdOutlineFilterList className="w-5 h-5 text-gray-600" aria-hidden="true" />
          </button>

          <button
            onClick={handleClearFilters}
            className="flex items-center px-3 py-2 rounded-md border hover:bg-gray-200 focus:outline-none w-1/4 justify-center"
            aria-label="Borrar filtros"
          >
            <MdOutlineFilterListOff className="w-5 h-5 text-gray-600" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};
