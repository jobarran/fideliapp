import { useState, useMemo } from 'react';
import { Company } from '@/interfaces';

export const useCompanyFilter = (companies: Company[], search: string) => {
  const [filters, setFilters] = useState({
    name: search, // Initialize with the provided search value
    activityTypeId: [] as string[],
  });

  const filteredCompanies = useMemo(() => {
    return companies.filter(company => {
      return (
        (filters.name === '' || company.name.toLowerCase().includes(filters.name.toLowerCase())) &&
        (filters.activityTypeId.length === 0 || filters.activityTypeId.includes(company.activityType.id))
      );
    });
  }, [companies, filters]);

  const clearFilters = () => {
    setFilters({
      name: '',
      activityTypeId: [],
    });
  };

  return {
    filteredCompanies,
    filters,
    setFilters,
    clearFilters
  };
};
