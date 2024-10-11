import { useState, useMemo } from 'react';
import { Company, Card } from '@/interfaces';

// Define a type guard for Company
const isCompany = (item: Company | Card): item is Company => {
  return (item as Company).name !== undefined; // Change this based on a unique property
};

// Define a type guard for Card
const isCard = (item: Company | Card): item is Card => {
  return (item as Card).company !== undefined; // Change this based on a unique property
};

type FilterInput = Company[] | Card[];

export const useCompanyNameFilter = (items: FilterInput, search: string) => {
  const [filters, setFilters] = useState({
    name: search, // Initialize with the provided search value
    activityTypeId: [] as string[],
  });

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      let companyName: string;
      let activityTypeId: string | undefined;
      let type: 'company' | 'card';

      if (isCard(item)) {
        // For Card: extract company name and activity type ID from card.company
        companyName = item.company.name.toLowerCase();
        activityTypeId = item.company.activityType?.id; // Handle optional chaining
        type = 'card';
      } else if (isCompany(item)) {
        // For Company: extract name and activity type ID from company itself
        companyName = item.name.toLowerCase();
        activityTypeId = item.activityType?.id; // Handle optional chaining
        type = 'company';
      } else {
        return false; // Fallback for safety
      }

      return (
        (filters.name === '' || companyName.includes(filters.name.toLowerCase())) &&
        (filters.activityTypeId.length === 0 || (activityTypeId && filters.activityTypeId.includes(activityTypeId)))
      );
    });
  }, [items, filters]);

  // Determine if filteredItems are of type 'company' or 'card'
  const filteredObj = filteredItems.length > 0 ? (isCard(filteredItems[0]) ? 'card' : 'company') : null;

  const clearFilters = () => {
    setFilters({
      name: '',
      activityTypeId: [],
    });
  };

  return {
    filteredItems,
    filteredObj,
    filters,
    setFilters,
    clearFilters,
  };
};
