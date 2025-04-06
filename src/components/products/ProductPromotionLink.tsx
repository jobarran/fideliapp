'use client'

import Link from 'next/link';
import React from 'react';
import { Reward } from '@/interfaces';
import { CompanyLinkImage } from '../company/CompanyLinkImage';
import { Avatar } from '..';

interface Props {
    reward: Reward;
}

export const ProductPromotionLink = ({ reward }: Props) => {
    // Default values
    let promoType = reward.productName.slice(0, 6);
    let promoName = reward.productName;

    // If it's a promotion, split it
    if (reward.productType === 'PROMOTION' && reward.productName.includes('-')) {
        const [type, name] = reward.productName.split('-', 2);
        promoType = type.trim();
        promoName = name.trim();
    }

    return (
        <div style={{ backgroundColor: '#F8F8F8' }}>
            <Link
                href={`/companies/${reward.companySlug}?tab=product`}
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
                    className="flex items-center justify-center p-1 bg-red-600 rounded-s-lg"
                    style={{
                        height: '4rem', // Match h-16
                    }}
                >
                    <span
                        className="text-white text-sm font-medium"
                        style={{
                            transform: 'rotate(-90deg)',
                            transformOrigin: 'center',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {promoType}
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
                            <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden" style={{ background: reward.companyBackgroundColor }}>
                                {reward.companyLogoUrl ? (
                                    <CompanyLinkImage
                                        src={reward.companyLogoUrl}
                                        alt={reward.companyName}
                                        className="object-cover w-full h-full"
                                        width={0}
                                        height={0}
                                    />
                                ) : (
                                    <Avatar name={reward.companyName} backgroundColor={reward.companyBackgroundColor} size={'8'} />
                                )}
                            </div>
                            <div className="min-w-0">
                                <p className="text-slate-400 text-xs overflow-hidden text-ellipsis whitespace-nowrap">
                                    {reward.companyName}
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
                                    {reward.points}
                                </p>
                                <p className="text-xs text-amber-500">Valor</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};
