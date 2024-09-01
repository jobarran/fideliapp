import { Card } from '@/interfaces';
import React from 'react';
import { SmScreenCompanyCard } from './SmScreenCompanyCard';
import Link from 'next/link';

interface Props {
  myCompanyCards: Card[];
}

export const SmScreenCards = ({ myCompanyCards }: Props) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="text-lg text-gray-900">Mis tarjetas</p>
        <Link
          className="cursor-pointer"
          href={`/companies`}>
          <p className="text-sm text-gray-900">Agregar</p>
        </Link>
      </div>
      <div className="w-full mt-2 mb-4 grid grid-cols-2 gap-2">    

        {myCompanyCards.map((card) => (
          <SmScreenCompanyCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

