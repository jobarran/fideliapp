"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode } from 'swiper/modules';

import { useIsMounted } from '@/hooks';
import { CompanyLink, SliderLoading, UserCard, UserCardAdd } from '..';
import { Card, Company } from '@/interfaces';
import { SwiperOptions } from 'swiper/types';

interface Props {
    data: Card[] | Company[]
    sliderType: "userCard" | "company",
    breakpoints: { [key: number]: SwiperOptions };  // Updated type
}

export const Slider = ({ data, sliderType, breakpoints }: Props) => {

    const isMounted = useIsMounted(); // Use the custom hook

    if (!isMounted) {
        return (
            <div className='w-full mt-2 mb-4'>
                <SliderLoading sliderType={sliderType} />
            </div>
        );
    }

    return (
        <div className='w-full mt-2 mb-4'>
            <Swiper
                breakpoints={breakpoints}
                spaceBetween={10}
                modules={[FreeMode]}
                className="clientsCardsSlider"
                pagination={{ clickable: true }}
            >
                {data.map((item) => (
                    <SwiperSlide key={item.id}>
                        {sliderType === "userCard" ? (
                            <UserCard card={item as Card} key={item.id} />
                        ) : (
                            <CompanyLink company={item as Company} key={item.id} />
                        )}
                    </SwiperSlide>
                ))}

                {sliderType === "userCard" && (
                    <SwiperSlide>
                        <UserCardAdd color={'slate-400'} />
                    </SwiperSlide>
                )}

            </Swiper>
        </div>
    );
};
