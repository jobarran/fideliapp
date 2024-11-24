'use client'

import Link from 'next/link';
import React from 'react';
import { Reward } from '@/interfaces';
import { CompanyLinkImage } from '../company/CompanyLinkImage';
import { Avatar } from '..';

interface Props {
    reward: Reward;
}



export const ProductRewardLink = ({ reward }: Props) => {
    return (
        <div style={{ backgroundColor: '#F8F8F8' }}>

            <div
                className='rounded-lg'
                style={{
                    backgroundColor: '#F8F8F8', borderColor: '#CBD5E1', borderWidth: 0.5, borderStyle: 'solid'
                }}
            >
                <Link href={`/companies/${reward.companySlug}?nav=product`}>

                    <div className="w-full rounded-lg overflow-hidden"
                        style={{ borderColor: '#F8F8F8', borderWidth: 0.5, borderStyle: 'solid' }}>

                        <div className="flex items-center bg-white p-2">

                            {/* Product Image Section */}
                            <div className="w-10 h-10 flex-shrink-0 rounded-full overflow-hidden bg-gray-200 mr-2">
                                {reward.companyLogoUrl ? (
                                    <CompanyLinkImage
                                        src={reward.companyLogoUrl}
                                        alt={reward.companyName}
                                        className="object-cover"
                                        width={0}
                                        height={0}
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                ) : (
                                    <Avatar name={reward.companyName} backgroundColor={reward.companyBackgroundColor} size={'10'} />
                                )}
                            </div>

                            {/* Product Details Section */}
                            <div className="flex-grow min-w-0 mr-2 text-left">
                                <p className="text-slate-400 text-xs overflow-hidden text-ellipsis whitespace-nowrap">
                                    {reward.companyName}
                                </p>
                                <h3 className="text-sm font-medium text-slate-800 overflow-hidden text-ellipsis whitespace-nowrap">
                                    {reward.productName}
                                </h3>
                                <p className="text-slate-400 text-xs overflow-hidden text-ellipsis whitespace-nowrap">
                                    {reward.description}
                                </p>
                            </div>

                            {/* Vertical Dotted Line Separator */}
                            <div className="border-l border-dotted border-gray-300 h-12 mx-1"></div>

                            {/* Points Section */}
                            <div className="flex flex-col items-center flex-shrink-0">
                                {/* Reward Points */}
                                <div className="text-center flex flex-col items-center space-y-1">
                                    <p className="text-sm md:text-md font-normal sm:font-semibold text-slate-800">{reward.points}</p>
                                    <p className="text-xs text-slate-400">Puntos</p>
                                </div>
                            </div>

                        </div>
                    </div>

                </Link >
            </div >
        </div >

    );
};
