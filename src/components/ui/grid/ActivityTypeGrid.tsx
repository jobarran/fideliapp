import { FC } from 'react';
import { ActivityTypeButton } from '@/components';
import { homeActivityTypes } from '@/config';

export const ActivityTypeGrid: FC = () => {
    return (
        <div
            className="w-full mt-4 mb-6 p-5 rounded-lg bg-white"
            style={{ borderColor: '#CBD5E1', borderWidth: 0.5, borderStyle: 'solid' }}
        >
            <div className="flex flex-row items-center justify-center sm:justify-normal">
                {/* Main Title */}
                <p className="text-sm md:text-base font-semibold text-gray-900">¿Qué estás buscando?</p>

                {/* Subheading */}
                <p className="hidden sm:block text-xs text-gray-600 ml-2">Explorá las secciones destacadas</p>
            </div>

            <div className="w-full mt-4 flex gap-2 flex-wrap lg:flex-nowrap justify-center">
                {homeActivityTypes.map((activity) => (
                    <ActivityTypeButton
                        key={activity.name}
                        name={activity.name}
                        icon={activity.icon}
                        iconColor={activity.iconColor}
                        activityTypeSlug={activity.activityTypeSlug}
                    />
                ))}
            </div>
        </div>
    );
};
