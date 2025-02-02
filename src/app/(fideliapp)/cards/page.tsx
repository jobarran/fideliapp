import { getActivityTypes, getAllCardsByUser } from '@/actions';
import { UserCardGrid } from '@/components';
import { Card } from '@/interfaces';
import React from 'react';
import { sortCards } from '@/utils';

export default async function CardsPage() {

    let myCompanyCards: Card[] = [];

    const cardsResult = await getAllCardsByUser();
    const activityTypes = await getActivityTypes();

    // if (cardsResult.ok) {
    //     myCompanyCards = cardsResult.cards || [];  // Ensure it's always an array
    // } else {
    //     console.error(cardsResult.message);
    // }

    // const sortedCards = sortCards(myCompanyCards);

    return (


        <>
            asd
        </>

        // <UserCardGrid
        //     userCards={sortedCards}
        //     gridClass="w-full mt-4 mb-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2"
        //     activityTypes={activityTypes}
        //     search={''}
        // />

    )
}
