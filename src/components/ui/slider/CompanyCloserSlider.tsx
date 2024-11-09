'use client';

import useCompaniesDistances from '@/hooks/useCompaniesDistances ';
import { BaseSlider, CompanyLinkWithDistance, SliderHeader, SliderLoading } from '../..';
import { Company } from '@/interfaces';

interface Props {
    companiesAll: Company[];
}

export const CompanyCloserSlider = ({ companiesAll }: Props) => {
    const { closestCompanies, isLoading } = useCompaniesDistances(companiesAll);  // Get companies with distances

    const breakpoints = {
        320: { slidesPerView: 3.5 },
        480: { slidesPerView: 4.5 },
        640: { slidesPerView: 6.5 },
        1024: { slidesPerView: 8.5 },
    };

    if (isLoading) {
        return <SliderLoading sliderType="company" />; // Show loading until distances are calculated
    }

    return (
        <div>
            <SliderHeader label={'Cercanos'} href={'/companies'} seeAllLabel={'Ver todos'} />
            <BaseSlider
                data={closestCompanies}  // Use the closest companies with distance
                breakpoints={breakpoints}
                renderItem={(closestCompanies) => (
                    <CompanyLinkWithDistance
                        company={closestCompanies.company}
                        distance={closestCompanies.distance}
                    />
                )}
                loadingComponent={<SliderLoading sliderType={'company'} />}
            />
        </div>
    );
};
