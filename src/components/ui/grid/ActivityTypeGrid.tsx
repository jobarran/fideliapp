// components/ActivityTypeGrid.tsx
import { FC } from 'react';
import { ActivityTypeButton, SliderHeader } from '@/components';
import { homeActivityTypes } from '@/config';

export const ActivityTypeGrid: FC = () => {
    return (
        <>
            <SliderHeader label="Qué estas buscando?" href="/" seeAllLabel="Ver todos" />
            <div className="w-full mt-2 mb-4 flex gap-2 flex-wrap lg:flex-nowrap justify-center">
                {homeActivityTypes.map((activity) => (
                    <ActivityTypeButton
                        key={activity.name}
                        name={activity.name}
                        icon={activity.icon}
                        color={activity.color}
                        classText={activity.classText}
                        classIcon={activity.classIcon}
                    />
                ))}
            </div>
        </>
    );
};
