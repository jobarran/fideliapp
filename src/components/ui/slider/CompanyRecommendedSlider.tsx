'use client';

import { BaseSlider, CompanyLinkWithRating, SliderHeader, SliderLoading } from '../..';
import { Company } from '@/interfaces';
import Link from 'next/link';
import { roundToStars } from '../../../utils/roundToStars';
import { useCompaniesInRadius } from '@/hooks';
import { useEffect, useState } from 'react';
import { companiesInRadiusDistance } from '@/config';

interface Props {
    companiesAll: Company[];
}

export const CompanyRecommendedSlider = ({ companiesAll }: Props) => {

    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const { filteredCompanies, isLoading } = useCompaniesInRadius(companiesAll, userLocation, companiesInRadiusDistance)

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lng: longitude });
                },
                () => {
                    // Fallback to a default location if geolocation fails
                    setUserLocation({ lat: 35.8799866, lng: 76.5048004 });
                }
            );
        } else {
            setUserLocation({ lat: 35.8799866, lng: 76.5048004 });
        }
    }, []);

    const bestCompanyRating = filteredCompanies
        .filter((company) => company.averageRating !== null) // Ensure there's a rating
        .sort((a, b) => b.averageRating - a.averageRating) // Sort by highest rating first
        .slice(0, 10); // Take the top 10

    const breakpoints = {
        320: { slidesPerView: 3.5 },
        480: { slidesPerView: 4.5 },
        640: { slidesPerView: 6.5 },
        1024: { slidesPerView: 8.5 },
    };

    return (
        <div>
            <SliderHeader label={'Destacados'} href={'/companies'} seeAllLabel={'Ver todos'} />

            {isLoading ? (
                <SliderLoading sliderType={'company'} />
            ) : bestCompanyRating.length > 0 ? (
                <BaseSlider
                    data={bestCompanyRating}
                    breakpoints={breakpoints}
                    renderItem={(bestCompanyRating) => (
                        <CompanyLinkWithRating
                            company={bestCompanyRating}
                            rating={roundToStars(bestCompanyRating.averageRating)}
                        />
                    )}
                    loadingComponent={<SliderLoading sliderType={'company'} />}
                />
            ) : (
                <p className="text-center text-xs text-slate-400 mt-2 mb-4 italic">
                    No encontramos negocios cercanos, explorá todos los negocios disponibles.{' '}
                    <Link href="/companies" className="not-italic font-medium text-slate-700 hover:text-slate-900">
                        Ver todos
                    </Link>.
                </p>
            )}

        </div>
    );

}