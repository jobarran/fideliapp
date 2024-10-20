import { Card } from '@/interfaces';
import { Slider, SliderHeader } from '../..';

interface Props {
    userCards: Card[]
}

export const UserCardSlider = ({ userCards }: Props) => {

    return (
        <div>
            <SliderHeader href={'/cards'} label={'Mis tarjetas'} seeAllLabel={'Ver todas'} />
            <Slider
                data={userCards}
                sliderType='userCard'
                breakpoints={{
                    320: { slidesPerView: 1.75 },
                    480: { slidesPerView: 2.5 },
                    640: { slidesPerView: 3.5 },
                    1024: { slidesPerView: 4.5 },
                }}
            />
        </div>
    )
}
