"use client";

import { UserProfileData, Company, ActivityType } from '@/interfaces';
import React, { useMemo } from 'react';
import { CompanyLinkLoading, SliderHeader, UserCardGrid, UserContentCardsCompanyLink } from '..';
import useClosestCompanies from '@/hooks/useCompaniesDistances';

interface Props {
  user: UserProfileData;
  companies: Company[];
  activityTypes: ActivityType[];

}

export const UserContentCards = ({ user, companies, activityTypes }: Props) => {

  const filteredCompanies = useMemo(
    () => companies.filter(
      (company) => !user.Cards.some((card) => card.company.slug === company.slug)
    ),
    [companies, user.Cards]
  );

  const { closestCompanies, isLoading } = useClosestCompanies(filteredCompanies);

  const sortedCards = useMemo(
    () => [...user.Cards].sort((a, b) => (a.favourite === b.favourite ? 0 : a.favourite ? -1 : 1)),
    [user.Cards]
  );

  return (
    <div className='space-y-2'>

      <UserCardGrid
        userCards={sortedCards}
        gridClass="w-full hidden sm:grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        activityTypes={activityTypes}
        search={''}
        userId={user.id}
      />


      {/* If no cards or companies */}
      {sortedCards.length === 0 && companies.length === 0 && <p className='text-xs italic text-gray-600'>No tienes tarjetas activas</p>}

      {/* Render closest companies */}

      <div className='pt-4 space-y-2'>
        <SliderHeader label={'Explorar negocios cercanos'} href={'/companies'} seeAllLabel={'Ver todos'} />
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-4">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
              <CompanyLinkLoading key={`loading-${index}`} />
            ))
            : closestCompanies.slice(0, 8).map(({ company }) => (
              <UserContentCardsCompanyLink key={company.id} company={company} />
            ))
          }
        </div>
      </div>

      {/* If no cards or companies */}
      {closestCompanies.length === 0 && <p className='text-xs italic text-gray-600'>No tienes negocios cercanos</p>}



    </div>
  );
};


