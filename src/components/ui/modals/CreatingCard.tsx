'use client';

import { Card } from '@/interfaces';
import Link from 'next/link';
import React, { useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import { Avatar, UserCardImage } from '../..';
import { softColor } from '../../../utils/softColor';
import { favouriteCard } from '@/actions';
import { useSession } from 'next-auth/react';

interface Props {
    name: string;
    backgroundColor: string
    logo: string | undefined
}

export const CreatingCard = ({ name, backgroundColor, logo }: Props) => {

    const { data } = useSession()

    // Unified color logic
    const borderColor = '#CBD5E1' //slate-300
    const backgroundCardColor = backgroundColor || '#0F172A';
    const color = backgroundCardColor


    return (
        <div
            style={{
                backgroundColor: '#F8F8F8',
            }}
        >
            <div className="rounded-lg overflow-hidden"
                style={{ borderColor: softColor(backgroundColor, 70), borderWidth: 0.5, borderStyle: 'solid' }}>
                <div
                    className="flex flex-col items-center justify-center bg-white"
                >
                    <div className="mt-1 text-sm font-medium" style={{ color: color }}>{name}</div>
                    <div className="mt-1 mb-2">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden flex items-center justify-center bg-white">
                            {logo ? (
                                <UserCardImage
                                    src={logo}
                                    width={0}
                                    height={0}
                                    alt={name}
                                    className="object-cover"
                                    priority
                                    style={{ width: '100%', height: '100%' }}
                                />
                            ) : (
                                <Avatar name={name} backgroundColor={backgroundColor} size={'16'} />
                            )}
                        </div>
                    </div>
                </div>
                {/* Mis puntos section at bottom left */}
                <div className="flex justify-center items-cente p-1 bg-white">
                    <p className="text-xs font-medium text-centerr" style={{ color: color }}>{`${data?.user.name} ${data?.user.lastName}`}</p> {/* Random number */}
                </div>
            </div>
        </div >
    )
}
