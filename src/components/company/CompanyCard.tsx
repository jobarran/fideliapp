import React from 'react'
import { Avatar } from '..'
import { FaHeart, FaRegHeart } from 'react-icons/fa6'
import Image from 'next/image'

interface Props {
    logo?: string,
    name: string,
    activityType: string,
    address: string,
    backgroundColor: string,
}

export const CompanyCard = ({ backgroundColor, name, activityType, logo }: Props) => {

    const borderColor = backgroundColor
    const color = '#0F172A'

    return (
            <div
                className="rounded-lg overflow-hidden w-72 mb-6 bg-white"
                style={{ borderColor: borderColor, borderWidth: 0.75, borderStyle: 'solid' }}
            >
                <div className="flex flex-col items-center justify-center mt-2">
                    <div className="text-base font-medium" style={{ color: color }}>{name}</div>
                    <div className="mt-1 text-sm font-normal text-slate-400">{activityType}</div>
                    <div className="mt-2 mb-2">
                        <div className="relative w-20 h-20 rounded-full overflow-hidden flex items-center justify-center bg-white">

                            {/* Conditionally render avatar or logo */}
                            {logo ? (
                                <Image
                                    src={logo}
                                    alt={name}
                                    className="object-cover w-full h-full"
                                    width={0} height={0} sizes="100vw"
                                    style={{ width: '100%', height: '100%' }}
                                />
                            ) : (
                                <Avatar name={name} backgroundColor={backgroundColor} size={'16'} />
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between mt-2 px-4 pb-2">
                    {/* Mis puntos section at bottom left */}
                    <div className="flex flex-col items-start">
                        <p
                            className="text-xs font-medium"
                            style={{ color: backgroundColor === "#FFFFFF" ? "#4F4F4F" : backgroundColor }}
                        >
                            Puntos
                        </p>
                    </div>
                    {/* Icons section at bottom right */}
                    <div className="flex space-x-2">
                        <FaHeart
                            size={16}
                            style={{ color: backgroundColor === "#FFFFFF" ? "#4F4F4F" : backgroundColor }}
                        />
                    </div>
                </div>
            </div>
    )
}
