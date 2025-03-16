import React from 'react';
import { IoTicketOutline } from 'react-icons/io5';
import { FaPlusCircle } from 'react-icons/fa';

interface Props {
    label: string;
    value: string | number;
    smScreenValue?: string;
    xsScreenValue?: string;
    color?: string;
    width?: string;
    className?: string;
}

export const ClientAdminMovementsDetail = ({
    label,
    value,
    smScreenValue,
    xsScreenValue,
    width = '',
    color = '',
    className = '',
}: Props) => {
    // Determine the icon based on label and value
    let icon = null;
    if (label === "Puntos") {
        if (typeof value === 'number') {
            if (value < 0) {
                icon = <IoTicketOutline className="mr-2" />; // Show ticket icon for negative points
            } else if (value > 0) {
                icon = <FaPlusCircle className="mr-2" />; // Show plus icon for positive points
            }
        }
    }

    return (
        <div className={`flex flex-col items-center justify-center ${width} ${className}`}>
            {/* Label for larger screens */}
            <p className="hidden sm:flex text-xs text-slate-400">{label}</p>
            {/* Full value for large screens */}
            <p className={`flex text-sm font-medium sm:mt-1 ${color} w-full items-center justify-center text-center`}>
                {icon && <span>{icon}</span>} {/* Display the icon if set */}
                <span className="inline-block max-w-full overflow-hidden whitespace-nowrap text-ellipsis text-left">
                    {value}
                </span>
            </p>
        </div>
    );
};
