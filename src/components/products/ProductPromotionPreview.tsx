import React from 'react'
import { Avatar } from "..";
import Image from 'next/image'

interface Props {
    logo: string
    companyColor: string
    promoType: string
    promoName: string
    companyName: string
    rewardPoints: number
}

export const ProductPromotionPreview = ({ logo, companyColor, promoType, promoName, companyName, rewardPoints }: Props) => {
    return (
        <div
            className="rounded-lg flex items-stretch"
            style={{
                backgroundColor: '#F8F8F8',
                borderColor: '#CBD5E1',
                borderWidth: 0.5,
                borderStyle: 'solid',
            }}
        >
            {/* PromoType Section */}
            <div
                className="flex items-center justify-center px-2 rounded-s-lg text-white bg-red-600 text-lg font-semibold min-w-20"
            >
                {promoType.slice(0, 6)}
            </div>

            {/* Main Content */}
            <div
                className="w-full overflow-hidden rounded-r-lg"
                style={{
                    borderRightColor: '#F8F8F8',
                    borderRightWidth: 0.5,
                    borderRightStyle: 'solid',
                }}
            >
                <div className="flex items-center bg-white h-16">

                    {/* Product Image Section */}
                    <div
                        className="flex items-center justify-center mr-2 h-full w-16"
                        style={{ background: companyColor }}
                    >
                        {logo ? (
                            <Image
                                src={logo}
                                alt="Preview"
                                className="object-cover h-full w-full"
                                width={100} // Ensure these are the same to maintain square aspect
                                height={100} // Matches Tailwind's w-24
                                sizes="100vw"
                            />

                        ) : (
                            <Avatar name={promoType} backgroundColor="#E5E5E5" size="24" />
                        )}
                    </div>

                    {/* Product Details Section */}
                    <div className="flex-grow min-w-0 mr-2 ml-2 text-left">
                        <p className="text-slate-400 text-xs overflow-hidden text-ellipsis whitespace-nowrap">
                            {companyName}
                        </p>
                        <h3 className="text-sm font-medium text-slate-800 overflow-hidden text-ellipsis whitespace-nowrap">
                            {promoName}
                        </h3>
                    </div>

                    {/* Vertical Dotted Line Separator */}
                    <div className="border-l border-dotted border-gray-300 h-12 mr-2"></div>

                    {/* Points Section */}
                    <div className="flex flex-col items-center flex-shrink-0 ml-2 mr-4">
                        <div className="text-center flex flex-col items-center space-y-1">
                            <p className="text-sm md:text-md font-normal sm:font-semibold text-amber-500">
                                {rewardPoints}
                            </p>
                            <p className="text-xs text-amber-500">Valor</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
