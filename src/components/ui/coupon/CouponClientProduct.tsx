"use client";

import { CompanyLinkImage } from '@/components/company/CompanyLinkImage';
import { Product } from '@/interfaces';
import React from 'react';
import { FaRegImage } from 'react-icons/fa6';
import { useSession } from 'next-auth/react';
import clsx from 'clsx';
import { IoTicketOutline } from 'react-icons/io5';
import { FaPlusCircle } from 'react-icons/fa';

interface Props {
    product: Product;
    buyPoints: string;
    rewardPoints: string;
}

export const CouponClientProduct = ({ product, buyPoints, rewardPoints }: Props) => {
    const { data } = useSession();
    const userId = data?.user.id;

    return (
        <div className={clsx("flex flex-row border rounded-lg mb-2 w-full transition-colors duration-300 ease-in-out bg-white text-slate-800")}>
            <div key={product.id} className="hover:bg-slate-50 w-full cursor-pointer">
                <div className={`flex items-center h-auto p-2 overflow-hidden`}>
                    {/* Product Image */}
                    {product.ProductImage ? (
                        <div className="w-10 h-10 flex-shrink-0 rounded-full overflow-hidden bg-gray-200 mr-4">
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
                    <div className="flex-grow min-w-0 mr-4">
                        {/* Product Name */}
                        <h3
                            className={`text-sm font-medium text-slate-800 overflow-hidden text-ellipsis whitespace-nowrap`}
                            style={{ wordBreak: 'break-word' }}
                        >
                            {product.name}
                        </h3>

                        {/* Product Description */}
                        <p className={`text-slate-400 text-xs overflow-hidden text-ellipsis whitespace-nowrap`}>
                            {product.description}
                        </p>

                    </div>

                    {/* Points Sections */}
                    <div className="flex flex-col items-center flex-shrink-0">
                        {/* Buy Points */}
                        {buyPoints && (
                            <div className="text-center items-center justify-center min-w-14">
                                <div className="flex items-center justify-center text-green-600">
                                    <FaPlusCircle className="mr-1 text-xs md:text-sm" />
                                    <p className="text-sm md:text-lg font-semibold">{buyPoints}</p>
                                </div>
                                <p className="text-xs text-slate-500">premio</p>
                            </div>
                        )}
                    </div>
                    {/* Vertical Dotted Line Separator */}
                    <div className="border-l border-dotted border-gray-300 h-12 mx-2 hidden sm:block"></div>
                    <div className="flex flex-col items-center flex-shrink-0">
                        {/* Reward Points */}
                        {rewardPoints && (
                            <div className="text-center items-center justify-center min-w-14">
                                <div className="flex items-center justify-center text-amber-600">
                                    <IoTicketOutline className="mr-1 text-sm md:text-lg" />
                                    <p className="text-sm md:text-lg font-semibold">{rewardPoints}</p>
                                </div>
                                <p className="text-xs text-slate-500">valor</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
