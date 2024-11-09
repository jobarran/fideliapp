"use client";

import { BaseSlider, CompanyLink, SliderHeader, SliderLoading } from '../..'
import { Company } from '@/interfaces'

interface Props {
    companiesAll: Company[]
}

export const CompanyPopularSlider = ({ companiesAll }: Props) => {


    const breakpoints = {
        320: { slidesPerView: 3.5 },
        480: { slidesPerView: 4.5 },
        640: { slidesPerView: 6.5 },
        1024: { slidesPerView: 8.5 },
    }

    return (
        <div>
            <SliderHeader label={'Cercanos'} href={'/companies'} seeAllLabel={'Ver todos'} />
            <BaseSlider
                data={companiesAll}
                breakpoints={breakpoints}
                renderItem={(company) => <CompanyLink company={company} />}
                loadingComponent={<SliderLoading sliderType={'company'} />}
            />
        </div>
    )
}
