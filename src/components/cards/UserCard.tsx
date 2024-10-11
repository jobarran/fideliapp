import { Card } from '@/interfaces';
import Link from 'next/link';
import React from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import { UserCardImage } from '..';

interface Props {
    card: Card,
}

export const UserCard = ({card}:Props) => {

        // Unified color logic
        const borderColor = '#slate-900'
        const backgroundColor = card.company.backgroundColor || '#slate-900';
        const color = backgroundColor

    return (
        <Link href={`/cards/${card.id}`} >
            <div
                className="w-70 rounded-lg shadow-sm overflow-hidden bg-white"
                style={{ borderColor: borderColor, borderWidth: 2, borderStyle: 'solid' }}
            >
                <div className="flex flex-col items-center justify-center">
                    <div className="mt-1 text-base font-medium" style={{ color: color }}>{card.company.name}</div>
                    <div className="mt-1 mb-2">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden flex items-center justify-center bg-white">
                            <UserCardImage
                                src={card.company.CompanyLogo?.url}
                                width={0}
                                height={0}
                                alt={card.company.name}
                                className="object-cover"
                                priority
                                style={{ width: '100%', height: '100%' }}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between px-4 pb-2">
                    {/* Mis puntos section at bottom left */}
                    <div className="flex flex-col items-start">
                        <p className="text-xs font-medium" style={{ color: color }}>{`${card.points} puntos`}</p> {/* Random number */}
                    </div>
                    {/* Icons section at bottom right */}
                    <div className="flex space-x-2">
                        {card.favourite ? (
                            <FaHeart size={16} style={{ color: color }} />
                        ) : (
                            <FaRegHeart size={16} style={{ color: color }} />
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}
