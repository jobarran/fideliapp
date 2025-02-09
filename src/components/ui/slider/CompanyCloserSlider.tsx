'use client';

import useCompaniesDistances from '@/hooks/useCompaniesDistances';
import { BaseSlider, CompanyLinkWithDistance, SliderHeader, SliderLoading } from '../..';
import { Company } from '@/interfaces';
import Link from 'next/link';

interface Props {
    companiesAll: Company[];
}

export const CompanyCloserSlider = ({ companiesAll }: Props) => {

    const { closestCompanies } = useCompaniesDistances(companiesAll);  // Get companies with distances

    const breakpoints = {
        320: { slidesPerView: 3.5 },
        480: { slidesPerView: 4.5 },
        640: { slidesPerView: 6.5 },
        1024: { slidesPerView: 8.5 },
    };

    return (
        <div>
            <SliderHeader label={'Cercanos'} href={'/companies'} seeAllLabel={'Ver todos'} />
            {closestCompanies.length > 0 ? (
                <BaseSlider
                    data={closestCompanies}
                    breakpoints={breakpoints}
                    renderItem={(closestCompanies) => (
                        <CompanyLinkWithDistance
                            company={closestCompanies.company}
                            distance={closestCompanies.distance}
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