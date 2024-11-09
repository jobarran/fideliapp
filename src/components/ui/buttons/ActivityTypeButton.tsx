// components/ActivityTypeButton.tsx
import { ElementType, FC } from 'react';
import { IconType } from 'react-icons';

type ActivityTypeButtonProps = {
    name: string;
    icon: IconType | ElementType; // Allow IconType or custom component
    color: string;
    classText: string;
    classIcon: string
};

export const ActivityTypeButton: FC<ActivityTypeButtonProps> = ({ name, icon: Icon, color, classText, classIcon }) => {
    return (
        <button
            className={`flex items-center ${classIcon} px-4 py-2 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 flex-1`}
            style={{
                borderColor: '#CBD5E1',
                borderWidth: 1,
                borderStyle: 'solid',
                backgroundColor: color,
                color: '#FFFFFF',
                // Irregular small white lines texture
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M2,2 L3,3' stroke='%23FFFFFF' stroke-width='0.5' /%3E%3Cpath d='M5,5 L6,6' stroke='%23FFFFFF' stroke-width='0.5' /%3E%3Cpath d='M8,8 L9,9' stroke='%23FFFFFF' stroke-width='0.5' /%3E%3Cpath d='M11,11 L12,12' stroke='%23FFFFFF' stroke-width='0.5' /%3E%3Cpath d='M14,14 L15,15' stroke='%23FFFFFF' stroke-width='0.5' /%3E%3Cpath d='M17,17 L18,18' stroke='%23FFFFFF' stroke-width='0.5' /%3E%3C/svg%3E")`,
                backgroundSize: '10px 10px', // Small equal spacing between the lines
                backgroundPosition: '0 0',
                backgroundRepeat: 'repeat', // Repeats the texture to fill the button
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
        </button>
    );
};
