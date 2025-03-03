"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';
import { useIsMounted } from '@/hooks';

interface BaseSliderProps<T> {
    data: T[];
    renderItem: (item: T) => React.ReactNode;
    breakpoints: { [key: number]: SwiperOptions };
    additionalSlides?: React.ReactNode; // For items like `UserCardAdd`
    loadingComponent?: React.ReactNode; // New loading component prop
}

export function BaseSlider<T>({
    data,
    renderItem,
    breakpoints,
    additionalSlides,
    loadingComponent,
}: BaseSliderProps<T>) {

    const isMounted = useIsMounted(); // Use the custom hook

    if (!isMounted && loadingComponent) {
        return (
            <div className='w-full'>
                {loadingComponent}
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
                {data.map((item, index) => (
                    <SwiperSlide key={index}>
                        {renderItem(item)}
                    </SwiperSlide>
                ))}
                {additionalSlides}
            </Swiper>
            
        </div>
    );
}
