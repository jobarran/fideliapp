'use client';

import { UserCard as UserCardProp } from '@/interfaces';
import Link from 'next/link';
import React, { useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import { Avatar, UserCardImage } from '..';
import { softColor } from '../../utils/softColor';
import { favouriteCard } from '@/actions';
import { cropText } from '../../utils/cropText';

interface Props {
    card: UserCardProp,
}

export const UserCard = ({ card }: Props) => {

    const [isFavourite, setIsFavourite] = useState(card.favourite);

    // Unified color logic
    const backgroundColor = card.company.backgroundColor || '#0F172A';
    const color = backgroundColor === '#FFFFFF' ? '#0F172A' : backgroundColor;

    // Function to toggle favorite status
    const toggleFavourite = async () => {
        try {
            await favouriteCard(card.id, !isFavourite); // Update on server
            setIsFavourite((prev) => !prev); // Toggle state using functional update
            console.log({ name: card.company.name, fav: !isFavourite }); // Log updated state
        } catch (error) {
            console.error("Error updating favorite status:", error);
        }
    };
    

    return (
        <div
            style={{
                backgroundColor: '#F8F8F8',
            }}
        >
            <Link href={`/companies/${card.company.slug}`} >
                <div className="rounded-lg overflow-hidden"
                    style={{ borderColor: softColor(color, 70), borderWidth: 0.5, borderStyle: 'solid' }}>
                    <div
                        className="flex flex-col items-center justify-center bg-white"
                    >
                        <div className="mt-1 text-sm font-medium" style={{ color: color }}>{cropText(card.company.name, 23)}</div>
                        <div className="mt-1 mb-2">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden flex items-center justify-center bg-white">
                                {card.company.CompanyLogo ? (
                                    <UserCardImage
                                        src={card.company.CompanyLogo?.url}
                                        width={0}
                                        height={0}
                                        alt={card.company.name}
                                        className="object-cover"
                                        priority
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                ) : (
                                    <Avatar name={card.company.name} backgroundColor={card.company.backgroundColor} size={'16'} />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between px-4 pb-2 bg-white">
                        {/* Mis puntos section at bottom left */}
                        <div className="flex flex-col items-start">
                            <p className="text-xs font-medium" style={{ color: color }}>{`${card.points} puntos`}</p> {/* Random number */}
                        </div>
                        {/* Icons section at bottom right */}
                        {isFavourite ? (
                            <FaHeart size={16} style={{ color: color }} onClick={(e) => { e.preventDefault(); toggleFavourite(); }} />
                        ) : (
                            <FaRegHeart size={16} style={{ color: color }} onClick={(e) => { e.preventDefault(); toggleFavourite(); }} />
                        )}
                    </div>
                </div>
            </Link>
        </div >
    )
}
