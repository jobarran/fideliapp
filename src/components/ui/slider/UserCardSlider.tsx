'use client';

import { UserCard as UserCardProp } from '@/interfaces';
import { BaseSlider, SliderHeader, SliderLoading, UserCard } from '../..';
import { useMemo } from 'react';


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
            {showHeader && <SliderHeader href={`/user/${userId}?tab=favoritos`} label={'Mis tarjetas'} seeAllLabel={'Ver todas'} />}
            <BaseSlider
                data={sortedCards} 
                breakpoints={breakpoints}
                renderItem={(card) => <UserCard card={card} />}
                loadingComponent={<SliderLoading sliderType={'userCard'} />}
            />
        </>
    );
};
