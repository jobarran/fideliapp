"use client";

import { UserCard, UserProfileData, Company } from '@/interfaces';
import React, { useState } from 'react';
import { UserContentFavouriteLink } from './UserContentFavouriteLink';
import { favouriteCard } from '@/actions';

interface Props {
  user: UserProfileData;
  companies: Company[]; // Add companies as a prop
}

export const UserContentFavourites = ({ user, companies }: Props) => {
  const [favouriteCards, setFavouriteCards] = useState(user.Cards.filter((card: UserCard) => card.favourite));
  const [nonFavouriteCards, setNonFavouriteCards] = useState(user.Cards.filter((card: UserCard) => !card.favourite));

  const handleAddToFavourite = async (companySlug: string) => {
    // Find the card based on company slug
    const cardToToggle = user.Cards.find((card) => card.company.slug === companySlug);

    if (!cardToToggle) return; // If card does not exist, do nothing

    // Check if the card is already a favourite
    const isFavourite = favouriteCards.some((card) => card.company.slug === companySlug);

    // Call server action to update the favourite status in the database
    const { ok } = await favouriteCard(cardToToggle.id, !isFavourite);

    if (ok) {
      // If the operation is successful, update the local state
      if (isFavourite) {
        setFavouriteCards((prev) => prev.filter((card) => card.company.slug !== companySlug));
        setNonFavouriteCards((prev) => [...prev, cardToToggle]);
      } else {
        setFavouriteCards((prev) => [...prev, cardToToggle]);
        setNonFavouriteCards((prev) => prev.filter((card) => card.company.slug !== companySlug));
      }
    } else {
      console.error("Failed to update favourite status in the database.");
    }
  };

  return (
    <div>
      {/* Favourites */}
      {favouriteCards.length > 0 && (
        <div>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-4">
            {favouriteCards.map((card: UserCard) => (
              <UserContentFavouriteLink
                key={card.company.slug}
                company={card.company}
                state="favourite"
                onAddToFavourite={handleAddToFavourite}
              />
            ))}
          </div>
        </div>
      )}

      {/* Non-Favourites */}
      {nonFavouriteCards.length > 0 && (
        <div>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-4 mt-4">
            {nonFavouriteCards.map((card: UserCard) => (
              <UserContentFavouriteLink
                key={card.company.slug}
                company={card.company}
                state="noFavourite"
                onAddToFavourite={handleAddToFavourite}
              />
            ))}
          </div>
        </div>
      )}

      {/* If no cards or companies */}
      {user.Cards.length === 0 && companies.length === 0 && <p>No cards or companies available</p>}
    </div>
  );
};
