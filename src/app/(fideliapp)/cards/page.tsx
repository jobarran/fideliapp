import { getAllCardsByUser } from '@/actions';
import { CompanyCardsByUserSlider, SmScreenCards } from '@/components';
import { Card } from '@/interfaces';
import Link from 'next/link';
import React from 'react';
import { LgScreenCards } from '../../../components/cards/lgScreen/LgScreenCards';
import { sortCards } from '@/utils';

export default async function CardsPage() {

    let myCompanyCards: Card[] = [];

    const cardsResult = await getAllCardsByUser();

    if (cardsResult.ok) {
        myCompanyCards = cardsResult.cards || [];  // Ensure it's always an array
    } else {
        console.error(cardsResult.message);
    }

    const sortedCards = sortCards(myCompanyCards);

    return (
        <>
            <div className='hidden sm:block'>
                <LgScreenCards myCompanyCards={sortedCards} />
            </div>
            <div className='block sm:hidden'>
                <SmScreenCards myCompanyCards={sortedCards} />
            </div>
        </>
    );
}
