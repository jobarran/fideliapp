
import { getActivityTypes, getAllCompanies } from '@/actions';
import React from 'react';
import { CompanyGrid } from '../../../components/company/CompanyGrid';

export default async function CompaniesPage() {

  const companies = await getAllCompanies();
  const activityTypes = await getActivityTypes();


  return (
    <>
      <CompanyGrid companies={companies} activityTypes={activityTypes} />
    </>
  );
}
