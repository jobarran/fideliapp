"use client"

import { Product } from "@/interfaces";
import { useState } from "react";

// ProductList Component
interface ProductListProps {
    product: Product;
    isExpanded: boolean
    toggleExpand: (productId: string) => void
    buyPoints: string
    rewardPoints: string
}

export const CompanyContentProductRow = ({ product, isExpanded, buyPoints, rewardPoints, toggleExpand }: ProductListProps) => {

    return (

        <li key={product.id}>
            <div className={`flex items-center h-auto p-2 border border-slate-200 rounded-lg transition-all duration-300 overflow-hidden ${isExpanded ? 'h-auto py-2' : ''}`}>
                {/* Product Image */}
                {product.ProductImage ? (
                    <div className="w-10 h-10 flex-shrink-0 rounded-full overflow-hidden bg-gray-200 mr-4">
                        <img
                            src={product.ProductImage.url}
                            alt={product.name}
                            className="object-cover w-full h-full"
                        />
                    </div>
                ) : (
                    <div className="w-12 h-12 flex-shrink-0 flex justify-center items-center border border-slate-100 bg-slate-50 rounded-full overflow-hidden mr-4">
                        <span className="text-2xl text-slate-300">No Image</span>
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

                    {/* Toggle Button */}
                    {(product.name.length > 20 || (product.description?.length || 0) > 20) && (
                        <button
                            onClick={() => toggleExpand(product.id)}
                            className="text-xs text-slate-800 mt-1 font-medium"
                        >
                            {isExpanded ? 'Ver menos' : 'Ver más'}
                        </button>
                    )}
                </div>

                {/* Points Sections */}
                <div className="flex flex-col items-center flex-shrink-0">
                    {buyPoints && (
                        <div className="text-center items-center justify-center min-w-14">
                            <div className="flex items-center justify-center text-green-600">
                                <span className="mr-1 text-sm">+</span>
                                <p className="text-sm font-semibold">{buyPoints}</p>
                            </div>
                            <p className="text-xs text-slate-500">premio</p>
                        </div>
                    )}
                </div>
                <div className="border-l border-dotted border-gray-300 h-12 mx-2 hidden sm:block"></div>
                <div className="flex flex-col items-center flex-shrink-0">
                    {rewardPoints && (
                        <div className="text-center items-center justify-center min-w-14">
                            <div className="flex items-center justify-center text-amber-600">
                                <span className="mr-1 text-sm">T</span>
                                <p className="text-sm font-semibold">{rewardPoints}</p>
                            </div>
                            <p className="text-xs text-slate-500">valor</p>
                        </div>
                    )}
                </div>
            </div>
        </li>
    );
};
