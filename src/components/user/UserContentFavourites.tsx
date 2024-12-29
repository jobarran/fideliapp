"use client";

import { UserCard, UserProfileData, Company } from '@/interfaces';
import React, { useEffect, useMemo, useState } from 'react';
import { UserContentFavouriteLink } from './UserContentFavouriteLink';
import { favouriteCard } from '@/actions';
import { CompanyLinkLoading, CompanyLinkWithDistance, SliderHeader, UserContentFavouriteCompanyLink } from '..';
import useClosestCompanies from '@/hooks/useCompaniesDistances';

interface Props {
  user: UserProfileData;
  companies: Company[];
}

export const UserContentFavourites = ({ user, companies }: Props) => {

  const filteredCompanies = useMemo(
    () => companies.filter(
      (company) => !user.Cards.some((card) => card.company.slug === company.slug)
    ),
    [companies, user.Cards]
  );

  // Pass stable filteredCompanies to useClosestCompanies
  const { closestCompanies, isLoading } = useClosestCompanies(filteredCompanies);

  const handleAddToFavourite = async (companySlug: string) => {
    const cardToToggle = user.Cards.find((card) => card.company.slug === companySlug);

    if (!cardToToggle) return;

    await favouriteCard(cardToToggle.id, !cardToToggle.favourite);
  };

  // Sort cards so that favourites are rendered first
  const sortedCards = useMemo(
    () => [...user.Cards].sort((a, b) => (a.favourite === b.favourite ? 0 : a.favourite ? -1 : 1)),
    [user.Cards]
  );

  return (
    <div className='space-y-2'>
      <SliderHeader label={'Mis tarjetas favoritas'} href={''} seeAllLabel={''} />      {/* Render sorted cards */}
      {sortedCards.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-4">
          {sortedCards.map((card: UserCard) => (
            <UserContentFavouriteLink
              key={card.company.slug}
              company={card.company}
              favourite={card.favourite}
              onAddToFavourite={handleAddToFavourite}
            />
          ))}
        </div>
      )}

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
              <UserContentFavouriteCompanyLink key={company.id} company={company} />
            ))
          }
        </div>
      </div>

      {/* If no cards or companies */}
      {closestCompanies.length === 0 && <p className='text-xs italic text-gray-600'>No tienes negocios cercanos</p>}



    </div>
  );
};


