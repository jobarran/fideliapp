import React from 'react'

export const FullWidhtMessage = ({
    message,
    bgColor,
}: {
    message: string;
    bgColor: string;
}) => (
    <div
        className={`flex items-center justify-center h-12 p-2 text-center text-white rounded-lg transition-all duration-300 ease-in-out ${bgColor}`}
    >
        {message}
    </div>
);