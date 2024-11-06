"use client";

import { CompanyLinkImage } from '@/components/company/CompanyLinkImage';
import { Product } from '@/interfaces';
import React from 'react';
import { FaArrowRightArrowLeft, FaBasketShopping, FaRegImage } from 'react-icons/fa6';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { FaEdit, FaTag } from 'react-icons/fa';

interface Props {
    product: Product;
    buyPoints: string;
    rewardPoints: string;
}

export const CouponClientProduct = ({ product, buyPoints, rewardPoints }: Props) => {

    const { data } = useSession()

    return (
        <div className="flex items-center flex-nowrap p-2 border border-slate-100 rounded-lg transition overflow-hidden">
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
            {/* Button Column */}
            <div className="flex flex-col space-y-1 mx-1 md:mx-2 md:w-16"> {/* Set the width here */}
                <button className="md:border border-gray-300 rounded-md px-1 py-1 text-xs text-lime-700 md:text-slate-700 hover:bg-lime-100 hover:text-lime-700 w-full">
                    <p className='hidden md:block'>Vender</p>
                    <FaBasketShopping  className='block md:hidden text-base' />
                </button>
                <button className="md:border border-gray-300 rounded-md px-1 py-1 text-xs text-amber-700 md:text-slate-700 hover:bg-amber-200 hover:text-amber-700 w-full">
                    <p className='hidden md:block'>Canjear</p>
                    <FaArrowRightArrowLeft   className='block md:hidden text-base' />
                </button>
                <Link href={`/client/${data?.user.id}/product/${product.id}`} passHref>
                    <button className="md:border border-gray-300 rounded-md px-1 py-1 text-xs text-slate-700 hover:bg-gray-100 w-full">
                        <p className='hidden md:block'>Editar</p>
                        <FaEdit className='block md:hidden text-base' />
                    </button>
                </Link>
            </div>
            {/* Vertical Dotted Line Separator */}
            <div className="border-l border-dotted border-gray-300 h-20 mx-2"></div>
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
    );
};
