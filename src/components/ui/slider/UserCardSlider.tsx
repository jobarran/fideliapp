'use client';

import { UserCard as UserCardProp } from '@/interfaces';
import { BaseSlider, SliderHeader, SliderLoading, UserCard } from '../..';
import { useMemo } from 'react';
import Link from 'next/link';


interface UserCardSliderProps {
    userCards: UserCardProp[];
    userId: string
    showHeader: boolean
}

export const UserCardSlider = ({ userCards, userId, showHeader }: UserCardSliderProps) => {

    const breakpoints = {
        0: { slidesPerView: 1.1 },
        335: { slidesPerView: 1.75 },
        480: { slidesPerView: 2.3 },
        640: { slidesPerView: 3.3 },
        1024: { slidesPerView: 4.5 },
    };

    const sortedCards = useMemo(
        () => [...userCards].sort((a, b) => (a.favourite === b.favourite ? 0 : a.favourite ? -1 : 1)),
        [userCards]
    );


    return (
        <>
            {showHeader && <SliderHeader href={`/user/${userId}?tab=tarjetas`} label={'Mis tarjetas'} seeAllLabel={'Ver todas'} />}
            {sortedCards.length > 0 ? (
                <BaseSlider
                    data={sortedCards}
                    breakpoints={breakpoints}
                    renderItem={(card) => <UserCard key={card.id} card={card} />}
                    loadingComponent={<SliderLoading sliderType={'userCard'} />}
                />

            ) : (
                <p className="text-center text-xs text-slate-400 mt-2 mb-4 italic">
                    No tenés tarjetas disponibles, explorá los negocios y creá tu primer tarjeta.{' '}
                    <Link href="/companies" className="not-italic font-medium text-slate-700 hover:text-slate-900">
                        Ver negocios
                    </Link>
                </p>
            )}
        </>
    );

};
