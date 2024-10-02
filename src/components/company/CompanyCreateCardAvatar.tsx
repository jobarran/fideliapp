import React from 'react'

interface Props {
    name: string;
    backgroundColor?: string;
}

export const CompanyCreateCardAvatar = ({ name, backgroundColor }: Props) => {

    const initial = name.charAt(0).toUpperCase()+name.charAt(1).toUpperCase(); // Get the first letter of the company name
    const color = backgroundColor === '#FFFFFF' ? '#4F4F4F' : backgroundColor;
    
    return (
        <div
            className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center"
            style={{ border: `4px solid ${color}` }} // Apply dynamic border color
        >
            <span
                className="text-lg font-bold text-slate-800"
                // style={{ color: '#000000' }} // Set initial text color to black
            >
                {initial}
            </span>
        </div>
    );
};
