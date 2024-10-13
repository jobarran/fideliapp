import React from 'react';

interface Props {
    name: string;
    backgroundColor?: string | null;
    size: string;
    className?: string
}

export const Avatar = ({ name, backgroundColor, size, className }: Props) => {

    const getInitials = (name: string) => {
        const words = name.split(' ').slice(0, 4);
        return words.map(word => word.charAt(0).toUpperCase()).join('');
    };

    const getFontSize = (name: string, size: string) => {
        const sizeNumber = parseInt(size, 10); // Convert size to a number
        const isLarge = sizeNumber >= 35; // Check if size is 35 or greater
        const wordsCount = name.split(' ').slice(0, 4).length;

        const baseSizes: { [key: string]: string } = {
            1: '2rem',
            2: '1.5rem',
            3: '1.25rem',
            4: '1rem'
        };

        // Get the font size from the baseSizes object or use '1rem' as default
        let fontSize = baseSizes[wordsCount.toString()] || '1rem';

        // If size is greater than or equal to 35, double the font size
        if (isLarge) {
            const numericValue = parseFloat(fontSize);
            fontSize = `${numericValue * 2}rem`;
        }

        return fontSize;
    };

    const initials = getInitials(name);
    const fontSize = getFontSize(name, size);
    const color = backgroundColor === '#FFFFFF' ? '#4F4F4F' : backgroundColor;

    return (
        <div
            className={`w-${size} h-${size} ${className} rounded-full bg-white shadow-sm flex items-center justify-center`}
            style={{ border: `4px solid ${color}`, fontSize }}
        >
            <span className="font-bold" style={{ color: `${color}` }}
            >
                {initials}
            </span>
        </div>
    );
};
