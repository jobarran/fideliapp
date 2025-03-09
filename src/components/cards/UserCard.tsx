'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaBan, FaHeart, FaRegHeart } from 'react-icons/fa6';
import { Avatar, UserCardImage } from '..';
import { softColor } from '../../utils/softColor';
import { favouriteCard } from '@/actions';
import { cropText } from '../../utils/cropText';
import { UserCard as UserCardProp } from '@/interfaces';

interface Props {
    card: UserCardProp;
}

export const UserCard = ({ card }: Props) => {
    
    const [isFavourite, setIsFavourite] = useState(card.favourite);

    const backgroundColor = card.company.backgroundColor;
    const inactiveColor = softColor(backgroundColor, 70);
    const textColor = card.company.textColor;

    const handleToggleFavourite = async () => {
        try {
            await favouriteCard(card.id, !isFavourite);
            setIsFavourite((prev) => !prev);
        } catch (error) {
            console.error('Error updating favorite status:', error);
        }
    };

    const renderImage = () =>
        card.company.CompanyLogo ? (
            <UserCardImage
                src={card.company.CompanyLogo.url}
                width={64}
                height={64}
                alt={card.company.name}
                className="object-cover w-full h-full"
                priority
            />
        ) : (
            <Avatar
                name={card.company.name}
                backgroundColor={card.company.backgroundColor}
                size="16"
            />
        );

    return (
        <div className="bg-gray-100 rounded-lg shadow-sm">
            <Link href={`/companies/${card.company.slug}`} className="block">
                <div
                    className="relative rounded-lg overflow-hidden flex flex-col justify-between"
                    style={{
                        backgroundColor: card.company.active ? backgroundColor : inactiveColor,
                    }}
                >
                    {/* Title Section */}
                    <div className="flex justify-center py-2">
                        <p
                            className="text-xs font-medium text-center"
                            style={{
                                color: card.company.active ? textColor : inactiveColor,
                            }}
                        >
                            {cropText(card.company.name, 23)}
                        </p>
                    </div>

                    {/* Image Section */}
                    <div className="flex flex-col items-center justify-center py-1">
                        <div className="relative w-12 sm:w-16 h-12 sm:h-16 rounded-full overflow-hidden">
                            {renderImage()}
                        </div>
                    </div>

                    {/* Footer Section */}
                    <div className="px-4 py-2 flex items-center justify-between bg-opacity-90">
                        {/* "Mis puntos" */}
                        <div>
                            <p
                                className="text-xs font-medium"
                                style={{
                                    color: card.company.active ? textColor : inactiveColor,
                                }}
                            >
                                {card.company.active ? `${card.points} puntos` : 'Negocio inactivo'}
                            </p>
                        </div>
                        {/* Favorite Icon */}
                        <div onClick={(e) => e.preventDefault()}>
                            {card.company.active ? (
                                isFavourite ? (
                                    <FaHeart
                                        size={16}
                                        style={{ color: textColor }}
                                        onClick={handleToggleFavourite}
                                    />
                                ) : (
                                    <FaRegHeart
                                        size={16}
                                        style={{ color: textColor }}
                                        onClick={handleToggleFavourite}
                                    />
                                )
                            ) : (
                                <FaBan size={16} style={{ color: inactiveColor }} />
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};
