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

            {/* PromoType Section with vertically rotated text */}
            <div
                className="flex items-center justify-center bg-red-600 rounded-s-lg"
                style={{
                    height: '4rem', // Match h-16
                    width: '3rem'
                }}
            >
                <span
                    className="text-white text-base font-semibold"
                    style={{
                        transform: 'rotate(-90deg)',
                        transformOrigin: 'center',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {promoType.slice(0, 6)}
                </span>
            </div>

            {/* Coupon Cut Divider */}
            <div className="relative h-16 flex items-center justify-center bg-white">
                {/* Dotted Line */}
                <div className="w-px h-full border-l border-dotted border-slate-500 z-0"></div>
                {/* Top Half Circle */}
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 -mt-[1px] w-3 h-2 bg-[#F8F8F8] border-x border-b border-gray-300 rounded-b-full z-10"
                />

                {/* Bottom Half Circle */}
                <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 -mb-[1px] w-3 h-2 bg-[#F8F8F8] border-x border-t border-gray-300 rounded-t-full z-10"
                />
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

                    {/* Product Details Section (with image inline) */}
                    <div className="flex-grow min-w-0 mr-2 ml-2 text-left flex items-center space-x-2">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden" style={{ background: companyColor }}>
                            {!logo ? (
                                <Image
                                    src={logo}
                                    alt="Preview"
                                    className="object-cover h-full w-full"
                                    width={100} // Ensure these are the same to maintain square aspect
                                    height={100} // Matches Tailwind's w-24
                                    sizes="100vw"
                                />
                            ) : (
                                <Avatar name={promoName} backgroundColor={companyColor} size="8" />
                            )}
                        </div>
                        <div className="min-w-0">
                            <p className="text-slate-400 text-xs overflow-hidden text-ellipsis whitespace-nowrap">
                                {companyName}
                            </p>
                            <h3 className="text-sm font-medium text-slate-800 overflow-hidden text-ellipsis whitespace-nowrap">
                                {promoName}
                            </h3>
                        </div>
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
