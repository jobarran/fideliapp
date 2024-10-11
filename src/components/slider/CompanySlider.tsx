import { Slider, SliderHeader } from '..'
import { Company } from '@/interfaces'

interface Props {
    companiesAll: Company[]
}

export const CompanySlider = ({ companiesAll }: Props) => {

    return (
        <div>
            <SliderHeader label={'Negocios'} href={'/companies'} seeAllLabel={'Ver todos'} />
            <Slider
                data={companiesAll}
                sliderType='company'
                breakpoints={{
                    320: { slidesPerView: 3.5 },
                    480: { slidesPerView: 4.5 },
                    640: { slidesPerView: 6.5 },
                    1024: { slidesPerView: 8.5 },
                }}
            />
        </div>
    )
}
