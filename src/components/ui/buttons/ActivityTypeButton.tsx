// components/ActivityTypeButton.tsx
import Link from 'next/link';
import { ElementType, FC } from 'react';
import { IconType } from 'react-icons';

type ActivityTypeButtonProps = {
    name: string;
    icon: IconType | ElementType; // Allow IconType or custom component
    iconColor: string; // Specific icon color for differentiation
    activityTypeSlug: string;
};

export const ActivityTypeButton: FC<ActivityTypeButtonProps> = ({
    name,
    icon: Icon,
    iconColor = '#4F4F4F', // Default icon color
    activityTypeSlug,
}) => {
    return (
        <Link
            href={{
                pathname: '/companies',
                query: { activityType: activityTypeSlug },
            }}
            passHref
            className={`flex items-center px-4 py-2 rounded-lg duration-200 flex-1 group`} // Add "group" class
            style={{
                borderColor: '#CBD5E1',
                borderWidth: 1,
                borderStyle: 'solid',
                color: '#4F4F4F', // Default text color
                background: "#F8F8F8"
            }}
        >
            {/* Icon Section */}
            <div
                className="flex items-center justify-center p-2 bg-white rounded-full transition-transform duration-200 ease-in-out transform group-hover:rotate-12 group-hover:scale-110" // Use group-hover to trigger on parent hover
            >
                <Icon
                    className="text-lg"
                    style={{ color: iconColor, fill: iconColor }} // Differentiated icon color
                />
            </div>

            {/* Text Section */}
            <span className="text-sm ml-2">{name}</span>
        </Link>
    );
};
