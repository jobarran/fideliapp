// components/ActivityTypeButton.tsx
import Link from 'next/link';
import { ElementType, FC } from 'react';
import { IconType } from 'react-icons';

type ActivityTypeButtonProps = {
    name: string;
    icon: IconType | ElementType; // Allow IconType or custom component
    color: string;
    classText: string;
    classIcon: string;
    activityTypeSlug: string;
};

export const ActivityTypeButton: FC<ActivityTypeButtonProps> = ({ name, icon: Icon, color, classText, classIcon, activityTypeSlug }) => {
    return (
        <Link
            href={{
                pathname: '/companies',
                query: { activityType: activityTypeSlug }, // Pass activityType as query param
            }}
            passHref
            className={`flex items-center ${classIcon} px-4 py-2 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 flex-1`}
            style={{
                borderColor: '#CBD5E1',
                borderWidth: 1,
                borderStyle: 'solid',
                backgroundColor: color,
                color: '#FFFFFF',
            }}
        >

            {/* Icon Section */}
            <div
                className="flex items-center justify-center p-2 rounded-full bg-opacity-90 transition-transform duration-200 ease-in-out transform hover:rotate-12 hover:scale-110"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            >
                <Icon className={`text-lg ${classIcon}`} style={{ color: 'currentColor', fill: 'currentColor' }} />
            </div>

            {/* Text Section */}
            <span className={`text-sm ml-2 ${classText}`}>
                {name}
            </span>
        </Link>
    );
};