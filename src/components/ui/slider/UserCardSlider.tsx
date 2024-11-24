'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/interfaces';
import { BaseSlider, SliderHeader, SliderLoading, UserCard, UserCardAdd } from '../..';
import { SwiperSlide } from 'swiper/react';
import { sortCards } from '@/utils';

interface UserCardSliderProps {
    userCards: Card[];
}

export const UserCardSlider = ({ userCards }: UserCardSliderProps) => {
    const [sortedCards, setSortedCards] = useState<Card[]>([]);

    useEffect(() => {
        setSortedCards(sortCards(userCards));
    }, []);

    const breakpoints = {
        320: { slidesPerView: 1.75 },
        480: { slidesPerView: 2.5 },
        640: { slidesPerView: 3.5 },
        1024: { slidesPerView: 4.5 },
    };

    return (
        <>
            <SliderHeader href={'/cards'} label={'Mis tarjetas'} seeAllLabel={'Ver todas'} />
            <BaseSlider
                data={sortedCards} // Use sorted cards
                breakpoints={breakpoints}
                renderItem={(card) => <UserCard card={card} />}
                additionalSlides={<SwiperSlide><UserCardAdd color={'#cbd5e1'} /></SwiperSlide>}
                loadingComponent={<SliderLoading sliderType={'userCard'} />}
            />
        </>
    );
};
