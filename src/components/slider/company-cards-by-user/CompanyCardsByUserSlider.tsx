"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode } from 'swiper/modules';
import { Card } from '@/interfaces';
import { CompanyCardsByUserCards } from './CompanyCardsByUserCards';
import { CompanyCardsByUserAdd } from './CompanyCardsByUserAdd';
import { useIsMounted } from '@/hooks/useIsMounted'; // Import the custom hook
import { CompanyCardsByUserLoading } from './CompanyCardsByUserLoading';

interface Props {
    myCards: Card[];
}

export const CompanyCardsByUserSlider = ({ myCards }: Props) => {
    
    const isMounted = useIsMounted(); // Use the custom hook

    if (!isMounted) {
        return (
            <div className='w-full mt-2 mb-4'>
                <CompanyCardsByUserLoading />
            </div>
        );
    }

    return (
        <div className='w-full mt-2 mb-4'>
            <Swiper
                breakpoints={{
                    320: { slidesPerView: 1.5 },
                    480: { slidesPerView: 2.5 },
                    640: { slidesPerView: 3.5 },
                    1024: { slidesPerView: 4.5 },
                }}
                spaceBetween={10}
                modules={[FreeMode]}
                className="clientsCardsSlider"
                pagination={{ clickable: true }}
            >
                {myCards.map((card) => (
                    <SwiperSlide key={card.id}>
                        <CompanyCardsByUserCards card={card} />
                    </SwiperSlide>
                ))}

                <SwiperSlide>
                    <CompanyCardsByUserAdd />
                </SwiperSlide>

            </Swiper>
        </div>
    );
};
