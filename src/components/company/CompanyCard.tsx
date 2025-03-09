import React from 'react'
import { Avatar, UserCardImage } from '..'
import { FaHeart } from 'react-icons/fa6'
import Image from 'next/image'
import { cropText, softColor } from '@/utils'

interface Props {
    logo?: string,
    name: string,
    activityType: string,
    address: string,
    backgroundColor: string,
    textColor: string
}

export const CompanyCard = ({ backgroundColor, textColor, name, logo, activityType }: Props) => {


    const renderImage = () =>
        logo ? (
            <Image
                src={logo}
                alt={name}
                className="object-cover w-full h-full"
                width={0} height={0} sizes="100vw"
                style={{ width: '100%', height: '100%' }}
            />
        ) : (
            <Avatar name={name} backgroundColor={backgroundColor} size={'28'} />
        )

    return (
        <div className="rounded-lg w-80 mb-4">
            <div
                className="relative rounded-lg overflow-hidden flex flex-col justify-between"
                style={{
                    backgroundColor: backgroundColor,
                }}
            >
                {/* Title Section */}
                <div className="flex flex-col justify-center py-2">
                    <p
                        className="text-base font-medium text-center"
                        style={{
                            color: textColor,
                        }}
                    >
                        {cropText(name, 23)}
                    </p>
                    <p
                        className="text-sm font-medium text-center"
                        style={{color: textColor}}
                    >
                        {activityType}
                    </p>
                </div>

                {/* Image Section */}
                <div className="flex flex-col items-center justify-center py-1">
                    <div className="relative w-28 h-28 rounded-full overflow-hidden">
                        {renderImage()}
                    </div>
                </div>

                {/* Footer Section */}
                <div className="px-4 py-2 flex items-center justify-between">
                    {/* "Mis puntos" */}
                    <div>
                        <p
                            className="text-sm font-medium"
                            style={{
                                color: textColor,
                            }}
                        >
                            Puntos
                        </p>
                    </div>
                    {/* Favorite Icon */}
                    <div onClick={(e) => e.preventDefault()}>
                        <FaHeart
                            size={16}
                            style={{ color: textColor }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

