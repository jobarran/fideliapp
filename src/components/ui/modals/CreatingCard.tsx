'use client';

import React from 'react'
import { Avatar, UserCardImage } from '../..';
import { useSession } from 'next-auth/react';

interface Props {
    name: string;
    backgroundColor: string
    companyTextColor: string
    logo: string | undefined
}

export const CreatingCard = ({ name, backgroundColor, companyTextColor, logo }: Props) => {

    const { data } = useSession()


    return (
        <div
            style={{
                backgroundColor: '#F8F8F8',
            }}
        >
            <div className="rounded-lg overflow-hidden"
                style={{ backgroundColor: backgroundColor }}>
                <div
                    className="flex flex-col items-center justify-center"
                >
                    <div className="mt-1 text-sm font-medium" style={{ color: companyTextColor }}>{name}</div>
                    <div className="mt-1 mb-2">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden flex items-center justify-center">
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
                <div className="flex justify-center items-cente p-1">
                    <p className="text-xs font-medium text-centerr" style={{ color: companyTextColor }}>{`${data?.user.name} ${data?.user.lastName}`}</p> {/* Random number */}
                </div>
            </div>
        </div >
    )
}
