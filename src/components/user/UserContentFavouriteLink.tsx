"use client"

import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { UserContentFavouriteCompanyLink } from '..';
import { CompanyShort } from '@/interfaces';
import { FaRegHeart } from 'react-icons/fa6';

interface Props {
    company: CompanyShort;
    favourite: boolean;
    onAddToFavourite: (companySlug: string) => void;
}

export const UserContentFavouriteLink = ({ company, favourite, onAddToFavourite }: Props) => {

    const color = company.backgroundColor === '#FFFFFF' ? '#878787' : company.backgroundColor;

    return (
        <div
        className="relative rounded-lg"
        >
            <UserContentFavouriteCompanyLink company={company} />
            <button
                className={`absolute bottom-2 right-2`}
                style={{ color }}
                onClick={() => onAddToFavourite(company.slug)}
            >
                {favourite ? <FaHeart /> : <FaRegHeart />}
            </button>

        </div>
    );
};
