'use client';

import useCompanyRewardDistance from '@/hooks/useCompanyRewardDistance';
import { BaseSlider, ProductPromotionLink, ProductRewardLink, SliderHeader, SliderLoading } from '../..';
import { Reward } from '@/interfaces';

interface Props {
    popularRewards: Reward[];
}

export const PopularPromoSlider = ({ popularRewards }: Props) => {

    const { filteredRewards, isLoading } = useCompanyRewardDistance(popularRewards); // Use the updated hook

    const breakpoints = {
        320: { slidesPerView: 1.5 },
        480: { slidesPerView: 1.5 },
        640: { slidesPerView: 2.5 },
        1024: { slidesPerView: 3.5 },
    };

    return (
        <div>
            <SliderHeader label={'Promociones'} href={''} seeAllLabel={''} />
            <BaseSlider
                data={filteredRewards}
                breakpoints={breakpoints}
                renderItem={(reward) => (<ProductPromotionLink reward={reward} />)}
                loadingComponent={<SliderLoading sliderType={'promotion'} />}
            />
        </div>
    );
};
