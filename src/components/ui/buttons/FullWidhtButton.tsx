import { LoadingSpinner } from '@/components';
import React from 'react'

export const FullWidhtButton = ({
    onClick,
    disabled,
    children,
    isLoading,
    additionalClasses,
}: {
    onClick: () => void;
    disabled: boolean;
    children: React.ReactNode;
    isLoading?: boolean;
    additionalClasses?: string;
}) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`group flex items-center justify-center w-full h-12 p-2 border rounded-lg transition-all duration-300 ease-in-out ${isLoading ? "bg-slate-800" : "bg-white hover:bg-slate-800"
            } ${additionalClasses}`}
    >
        {isLoading ? <LoadingSpinner /> : children}
    </button>
);