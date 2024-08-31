import { getActivityTypes, getAllCompanies } from '@/actions';
import React from 'react';
import { CompanyGrid } from '../../../components/company/CompanyGrid';
import { SearchParams } from '@/types/types';

interface Props {
  searchParams: SearchParams;
}

export default async function CompaniesPage({ searchParams }: Props) {
  const { search } = searchParams;
  const companies = await getAllCompanies();
  const activityTypes = await getActivityTypes();

  return (
    <>
      <CompanyGrid companies={companies} activityTypes={activityTypes} search={search || ''} />
    </>
  );
}
