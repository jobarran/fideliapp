import { CompanyLinkImage } from '@/components/company/CompanyLinkImage';
import { Product } from '@/interfaces';
import React from 'react';

interface Props {
    product: Product;
    buyPoints: string;
    rewardPoints: string;
}

export const CouponClientProduct = ({ product, buyPoints, rewardPoints }: Props) => {
    return (
        <div className="flex items-center p-4 border border-slate-100 rounded-lg transition hover:bg-slate-100">

            {/* Product Image */}
            {product.ProductImage ? (
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 mr-4">
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
                <div className="w-16 h-16 flex justify-center items-center bg-gray-300 rounded-full overflow-hidden mr-4">
                    <span className="text-xs text-gray-500">No Image</span> {/* Placeholder Avatar */}
                </div>
            )}

            {/* Product Details */}
            <div className="flex-grow pr-4">
                <h3 className="text-sm md:text-lg font-medium text-gray-900">{product.name}</h3>
                <p className="text-gray-600 text-xs">{product.description}</p>
            </div>

            {/* Points Section */}
            <div className="flex flex-col items-center space-y-2">
                {buyPoints && (
                    <div className="text-center">
                        <p className="hidden sm:block text-xs text-gray-500">Puntos Compra</p>
                        <p className="text-sm md:text-lg font-normal sm:font-semibold text-gray-900">{buyPoints}</p>
                    </div>
                )}
            </div>
            {/* Vertical Dotted Line Separator */}
            <div className="border-l border-dotted border-gray-300 h-16 mx-4"></div>

            <div className="flex flex-col items-center space-y-2">

                {rewardPoints && (
                    <div className="text-center">
                        <p className="hidden sm:block text-xs text-gray-500">Puntos Canje</p>
                        <p className="text-sm md:text-lg font-normal sm:font-semibold text-gray-900">{rewardPoints}</p>
                    </div>
                )}
            </div>
        </div>
    );
};
