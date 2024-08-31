"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// import required modules
import { FreeMode } from 'swiper/modules';
import { Card, Company } from '@/interfaces';
import { CompaniesAllCards, CompaniesAllLoading, CompanyCardsByUserCards, FullWidthLoading } from '@/components';
import { useEffect, useState } from 'react';
import { useIsMounted } from '@/hooks';

interface Props {
    companiesAll: Company[]
}
export const CompaniesAllSlider = ({ companiesAll }: Props) => {
    
    const isMounted = useIsMounted(); // Use the custom hook

    if (!isMounted) {
        return (
            <div className='w-full mt-2 mb-4'>
                <CompaniesAllLoading />
            </div>
        );
    }
    
    return (
        <div className='w-full mt-2 mb-4'>
                <Swiper breakpoints={{
                    320: { // when window width is >= 320px
                        slidesPerView: 3.5,
                    },
                    480: { // when window width is >= 640px
                        slidesPerView: 4.5,
                    },
                    640: { // when window width is >= 640px
                        slidesPerView: 6.5,
                    },
                    1024: { // when window width is >= 1024px
                        slidesPerView: 8.5,
                    },
                }} spaceBetween={10}
                    modules={[FreeMode]}
                    className="clientsCardsSlider"
                    pagination={{
                        clickable: true,
                    }}
                >
                    {companiesAll.map((company: Company) => (
                        <SwiperSlide key={company.id}>
                            <CompaniesAllCards company={company} />
                        </SwiperSlide>
                    ))}

                </Swiper>
        </div >
    );
};
