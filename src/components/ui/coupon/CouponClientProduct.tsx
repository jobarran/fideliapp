"use client";

import { CompanyLinkImage } from '@/components/company/CompanyLinkImage';
import { Product } from '@/interfaces';
import React from 'react';
import { FaRegImage } from 'react-icons/fa6';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface Props {
    product: Product;
    buyPoints: string;
    rewardPoints: string;
}

export const CouponClientProduct = ({ product, buyPoints, rewardPoints }: Props) => {

    const { data } = useSession()

    return (
        <Link href={`/client/${data?.user.id}/product/${product.id}`} passHref>
            <div className="flex items-center flex-nowrap p-2 border border-slate-100 rounded-lg transition hover:bg-slate-100 overflow-hidden">
                {/* Product Image */}
                {product.ProductImage ? (
                    <div className="w-12 h-12 flex-shrink-0 rounded-full overflow-hidden bg-gray-200 mr-4">
                        <CompanyLinkImage
                            src={product.ProductImage.url}
                            alt={product.name}
                            className="object-cover"
                            width={0}
                            height={0}
                            style={{ width: '100%', height: '100%' }}
                        />
                    </div>
                ) : (
                    <div className="w-12 h-12 flex-shrink-0 flex justify-center items-center border border-slate-100 bg-slate-50 rounded-full overflow-hidden mr-4">
                        <FaRegImage className="text-2xl text-slate-300" />
                    </div>
                )}
                {/* Product Details */}
                <div className="flex-grow min-w-0">
                    <h3 className="text-sm font-medium text-slate-800 overflow-hidden text-ellipsis whitespace-nowrap">
                        {product.name}
                    </h3>
                    <p className="text-slate-400 text-xs overflow-hidden text-ellipsis whitespace-nowrap">
                        {product.description}
                    </p>
                </div>
                {/* Vertical Dotted Line Separator */}
                <div className="border-l border-dotted border-gray-300 h-16 mx-2"></div>
                {/* Points Section */}
                <div className="flex flex-col items-center space-y-2 flex-shrink-0">
                    {/* Buy Points */}
                    {buyPoints && (
                        <div className="text-center flex items-center space-x-2">
                            <p className="text-xs text-gray-500">Premio</p>
                            <p className="text-sm md:text-lg font-normal sm:font-semibold text-gray-900">{buyPoints}</p>
                        </div>
                    )}
                    {/* Horizontal Dotted Line Separator */}
                    <div className="border-t border-dotted border-gray-300 my-2 w-16 sm:w-20"></div>

                    {/* Reward Points */}
                    {rewardPoints && (
                        <div className="text-center flex items-center space-x-2">
                            <p className="text-xs text-gray-500">Valor</p>
                            <p className="text-sm md:text-lg font-normal sm:font-semibold text-gray-900">{rewardPoints}</p>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
};
