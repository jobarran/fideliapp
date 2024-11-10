import React from 'react';

interface Props {
    name: string;
    backgroundColor?: string | null;
    size: string;
    className?: string;
}

export const Avatar = ({ name, backgroundColor, size, className }: Props) => {
    const getInitials = (name: string) => {
        const words = name.split(' ').slice(0, 4);
        return words.map(word => word.charAt(0).toUpperCase()).join('');
    };

    const getFontSize = (name: string, size: string) => {
        const sizeNumber = parseInt(size, 10); // Convert size to a number
        const wordsCount = name.split(' ').slice(0, 4).length;

        const baseSizes: { [key: string]: string } = {
            1: '2rem',
            2: '1.5rem',
            3: '1.25rem',
            4: '1rem',
            5: '0.75rem', // Added base size for smaller size (10)
        };

        // Set the font size based on size and word count
        let fontSize = baseSizes[wordsCount.toString()] || '1rem';

        // If size is too small, directly scale down the font
        if (sizeNumber < 15) {
            fontSize = '0.75rem'; // Default smaller font size for very small avatars
        }

        return fontSize;
    };

    const initials = getInitials(name);
    const fontSize = getFontSize(name, size);
    const color = backgroundColor === '#FFFFFF' ? '#4F4F4F' : backgroundColor;

    return (
        <div
            className={`w-${size} h-${size} ${className} rounded-full bg-white flex items-center justify-center`}
            style={{ border: `2px solid ${color}`, fontSize }}
        >
            <span className="font-bold" style={{ color: `${color}` }}>
                {initials}
            </span>
        </div>
    );
};
