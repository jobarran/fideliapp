"use client"

import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { UserContentFavouriteCompanyLink } from '..';
import { CompanyShort } from '@/interfaces';
import { FaRegHeart } from 'react-icons/fa6';

interface Props {
    company: CompanyShort;
    state: 'favourite' | 'noFavourite';
    onAddToFavourite: (companySlug: string) => void;
}

export const UserContentFavouriteLink = ({ company, state, onAddToFavourite }: Props) => {
    // State for hover effect
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="relative rounded-lg">
            <UserContentFavouriteCompanyLink company={company} />
            <div className="flex justify-center items-center">
                {state === 'noFavourite' && (
                    <button
                        onClick={() => onAddToFavourite(company.slug)}
                        onMouseEnter={() => setIsHovered(true)} // Set hover state to true
                        onMouseLeave={() => setIsHovered(false)} // Set hover state to false
                        className="flex p-1 items-center justify-center text-gray-500 text-xs sm:text-sm space-x-2"
                    >
                        <p className={`transition-colors ${isHovered ? 'text-gray-900' : 'text-gray-500'}`}>
                            Agregar
                        </p>
                        {isHovered ? <FaHeart className="text-gray-900" /> : <FaRegHeart />}
                    </button>
                )}
                {state === 'favourite' && (
                    <button
                        className="absolute top-2 right-2 text-red-500"
                        onClick={() => onAddToFavourite(company.slug)}
                    >
                        <FaHeart />
                    </button>
                )}
            </div>
        </div>
    );
};
