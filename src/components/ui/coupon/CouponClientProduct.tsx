"use client";

import { CompanyLinkImage } from '@/components/company/CompanyLinkImage';
import { Product } from '@/interfaces';
import React from 'react';
import { FaRegImage } from 'react-icons/fa6';
import { truncateText } from '../../../utils/truncateText';
import useWindowSize from '@/hooks/useWindowSize';

interface Props {
    product: Product;
    buyPoints: string;
    rewardPoints: string;
}

export const CouponClientProduct = ({ product, buyPoints, rewardPoints }: Props) => {

    const { width } = useWindowSize();

    // Define character limits based on window width, with default values
    const nameLimit = (width && width < 640) ? 15 : 35; // Use 15 if width is undefined
    const descriptionLimit = (width && width < 640) ? 20 : 60; // Use 20 if width is undefined

    return (
        <div className="flex items-center p-4 border border-slate-100 rounded-lg transition hover:bg-slate-100">

            {/* Product Image */}
            {product.ProductImage ? (
                <div className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 rounded-full overflow-hidden bg-gray-200 mr-4">
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
                <div className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 flex justify-center items-center border border-slate-100 bg-slate-50 rounded-full overflow-hidden mr-4">
                    <FaRegImage className="text-2xl text-slate-300" />
                </div>
            )}

            {/* Product Details */}
            <div className="flex-grow pr-4">
                <h3 className="text-sm md:text-lg font-medium text-slate-800">{truncateText(product.name, nameLimit)}</h3>
                <p className="text-slate-400 text-xs ">{truncateText(product.description, descriptionLimit)}</p>
            </div>

            {/* Vertical Dotted Line Separator */}
            <div className="border-l border-dotted border-gray-300 h-16 mx-3"></div>

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
                <div className="border-t border-dotted border-gray-300 w-full my-2"></div>

                {/* Reward Points */}
                {rewardPoints && (
                    <div className="text-center flex items-center space-x-2">
                        <p className="text-xs text-gray-500">Costo</p>
                        <p className="text-sm md:text-lg font-normal sm:font-semibold text-gray-900">{rewardPoints}</p>
                    </div>
                )}
            </div>
        </div>
    );
};
