"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// import required modules
import { FreeMode } from 'swiper/modules';
import { Card } from '@/interfaces';
import { CompanyCardsByUserCards } from './CompanyCardsByUserCards';
import { CompanyCardsByUserAdd } from './CompanyCardsByUserAdd';

interface Props {
    myCards: Card[]
}
export const CompanyCardsByUserSlider = ({ myCards }: Props) => {

    return (
        <div className='w-full mt-2 mb-4'>
            <Swiper
                breakpoints={{
                    320: { // when window width is >= 320px
                        slidesPerView: 1.5,
                    },
                    480: { // when window width is >= 640px
                        slidesPerView: 2.5,
                    },
                    640: { // when window width is >= 640px
                        slidesPerView: 3.5,
                    },
                    1024: { // when window width is >= 1024px
                        slidesPerView: 4.5,
                    },
                }} spaceBetween={10}
                modules={[FreeMode]}
                className="clientsCardsSlider"
                pagination={{
                    clickable: true,
                }}
            >
                {myCards.map((card: any) => (
                    <SwiperSlide key={card.id}>
                        <CompanyCardsByUserCards card={card} />
                    </SwiperSlide>
                ))}

                {/* Add the CompanyCardsByUserAdd component at the end */}
                <SwiperSlide>
                    <CompanyCardsByUserAdd />
                </SwiperSlide>

            </Swiper>
        </div >
    );
};
