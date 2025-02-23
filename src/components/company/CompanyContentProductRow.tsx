"use client";

import { Product } from "@/interfaces";
import Image from "next/image";
import React from "react";

interface ProductListProps {
    product: Product;
    isExpanded: boolean;
    toggleExpand: (productId: string) => void;
    buyPoints: string;
    rewardPoints: string;
}

export const CompanyContentProductRow = ({
    product,
    isExpanded,
    buyPoints,
    rewardPoints,
    toggleExpand,
}: ProductListProps) => {
    // Fallback No Image URL (Placeholder)
    const noImagePlaceholder = "/imgs/noimage-logo.jpg";

    return (
        <li key={product.id}>
            <div
                className={`flex items-center h-auto p-2 border border-slate-200 rounded-lg transition-all duration-300 overflow-hidden ${isExpanded ? "h-auto py-2" : ""
                    }`}
            >
                {/* Product Image */}
                <div className="w-10 h-10 flex-shrink-0 rounded-full overflow-hidden bg-gray-200 mr-4">
                    <Image
                        src={product?.ProductImage?.url || noImagePlaceholder}
                        width={40}
                        height={40}
                        alt={product.name || "No image available"}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        sizes="100vw"
                        className="w-full h-full"
                    />
                </div>

                {/* Product Details */}
                <div className="flex-grow min-w-0 mr-4">
                    {/* Product Name */}
                    <h3
                        className={`text-sm font-medium text-slate-800 ${isExpanded
                                ? "whitespace-normal"
                                : "overflow-hidden text-ellipsis whitespace-nowrap"
                            }`}
                        style={{ wordBreak: "break-word" }}
                    >
                        {product.name}
                    </h3>

                    {/* Product Description */}
                    <p
                        className={`text-slate-400 text-xs ${isExpanded
                                ? "whitespace-normal"
                                : "overflow-hidden text-ellipsis whitespace-nowrap"
                            }`}
                    >
                        {product.description}
                    </p>

                    {/* Toggle Button */}
                    {(product.name.length > 20 ||
                        (product.description?.length || 0) > 20) && (
                            <button
                                onClick={() => toggleExpand(product.id)}
                                className="text-xs text-slate-800 mt-1 font-medium"
                            >
                                {isExpanded ? "Ver menos" : "Ver más"}
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
