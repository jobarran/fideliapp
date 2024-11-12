"use client";

import { CompanyLinkImage } from '@/components/company/CompanyLinkImage';
import { Product } from '@/interfaces';
import React, { useState } from 'react';
import { FaRegImage } from 'react-icons/fa6';
import { IoTicketOutline } from 'react-icons/io5';

interface Props {
    products: Product[];
}

export const CompanyContentProduct = ({ products }: Props) => {
    const [expandedProductIds, setExpandedProductIds] = useState<Set<string>>(new Set());

    const toggleExpand = (productId: string) => {
        setExpandedProductIds((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(productId)) {
                newSet.delete(productId);
            } else {
                newSet.add(productId);
            }
            return newSet;
        });
    };

    return (
        <div>
            <ul className="space-y-2">
                {products.map((product) => {
                    const isExpanded = expandedProductIds.has(product.id);
                    const buyPoints = product.templates
                        ?.filter((t) => t.type === "BUY")
                        .map((t) => t.points)
                        .join(", ");
                    const rewardPoints = product.templates
                        ?.filter((t) => t.type === "REWARD")
                        .map((t) => t.points)
                        .join(", ");

                    return (
                        <li key={product.id}>
                            <div className={`flex items-center h-24 p-2 border border-slate-100 rounded-lg transition-all duration-300 overflow-hidden ${isExpanded ? 'h-auto py-4' : ''}`}>
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
                                <div className="flex-grow min-w-0 mr-4">
                                    {/* Product Name */}
                                    <h3
                                        className={`text-sm font-medium text-slate-800 ${isExpanded ? 'whitespace-normal' : 'overflow-hidden text-ellipsis whitespace-nowrap'}`}
                                        style={{ wordBreak: 'break-word' }}
                                    >
                                        {product.name}
                                    </h3>

                                    {/* Product Description */}
                                    <p className={`text-slate-400 text-xs ${isExpanded ? 'whitespace-normal' : 'overflow-hidden text-ellipsis whitespace-nowrap'}`}>
                                        {product.description}
                                    </p>

                                    {/* Unified Toggle Button */}
                                    {(product.name.length > 20 || (product.description?.length || 0) > 50) && (
                                        <button
                                            onClick={() => toggleExpand(product.id)}
                                            className="text-xs text-slate-800 mt-1 font-medium block sm:hidden"
                                        >
                                            {isExpanded ? 'Ver menos...' : 'Ver más...'}
                                        </button>
                                    )}
                                </div>

                                {/* Points Sections */}
                                <div className="flex flex-col items-center flex-shrink-0">
                                    {/* Buy Points */}
                                    {buyPoints && (
                                        <div className="text-center items-center">
                                            <p className="text-sm md:text-lg font-semibold text-green-600">+ {buyPoints}</p>
                                            <p className="text-xs text-slate-500">puntos</p>
                                        </div>
                                    )}
                                </div>
                                {/* Vertical Dotted Line Separator */}
                                <div className="border-l border-dotted border-gray-300 h-12 mx-2"></div>
                                <div className="flex flex-col items-center flex-shrink-0">
                                    {/* Reward Points */}
                                    {rewardPoints && (
                                        <div className="text-center items-center justify-center min-w-14">
                                            <div className="flex items-center justify-center text-amber-600">
                                                <IoTicketOutline className="mr-1 text-sm md:text-lg" />
                                                <p className="text-sm md:text-lg font-semibold">{rewardPoints}</p>
                                            </div>
                                            <p className="text-xs text-slate-500">puntos</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
