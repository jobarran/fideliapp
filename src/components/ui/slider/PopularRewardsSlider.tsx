'use client';

import { BaseSlider, ProductRewardLink, SliderHeader, SliderLoading } from '../..';
import { Reward } from '@/interfaces';

interface Props {
    popularRewards: Reward[];
}

export const PopularRewardsSlider = ({ popularRewards }: Props) => {

    const breakpoints = {
        320: { slidesPerView: 1.5 },
        480: { slidesPerView: 1.5 },
        640: { slidesPerView: 2.5 },
        1024: { slidesPerView: 3.5 },
    };

    return (
        <div>
            <SliderHeader label={'Recompensas'} href={''} seeAllLabel={''} />
            <BaseSlider
                data={popularRewards}
                breakpoints={breakpoints}
                renderItem={(popularRewards) => (<ProductRewardLink reward={popularRewards} />)}
                loadingComponent={<SliderLoading sliderType={'reward'} />}
            />
        </div>
    );
};
