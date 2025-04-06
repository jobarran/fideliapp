"use client";

import { Product } from "@/interfaces";
import Image from "next/image";
import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { IoTicketOutline } from "react-icons/io5";

interface ProductListProps {
    product: Product;
    isExpanded: boolean;
    toggleExpand: (productId: string) => void;
    buyPoints: string;
    rewardPoints: string;
    companyLogo?: string;
    companyColor: string;
    isDisabled?: boolean;
}


export const CompanyContentProductRow = ({
    product,
    isExpanded,
    buyPoints,
    rewardPoints,
    toggleExpand,
    companyLogo,
    companyColor,
    isDisabled
}: ProductListProps) => {
    const noImagePlaceholder = companyLogo ? companyLogo : "/imgs/noimage-logo.jpg";

    const [promoTitle, promoSubtitle] =
        product.productType === "PROMOTION" && product.name.includes("-")
            ? product.name.split(" - ", 2)
            : [null, product.name];

    return (
        <li key={product.id}>
            <div
                className={`flex items-center h-16 p-2 border border-slate-200 rounded-lg transition-all duration-300 overflow-hidden
                ${isExpanded ? "h-auto py-2" : ""}
            `}
            >
                {/* Product Image */}
                <div
                    className={`w-10 h-10 flex-shrink-0 rounded-full overflow-hidden mr-4`}
                    style={{
                        background: product?.ProductImage?.url
                            ? "transparent"
                            : companyLogo
                                ? companyColor
                                : "gray",
                    }}
                >
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
                    <h3
                        className={`text-sm p-1 font-medium text-slate-800 ${isExpanded ? "whitespace-normal" : "overflow-hidden text-ellipsis whitespace-nowrap"}`}
                        style={{ wordBreak: "break-word" }}
                    >
                        {promoTitle && (
                            <span className="bg-red-500 text-white px-2 py-1 rounded-md mr-2">
                                {promoTitle}
                            </span>
                        )}
                        {promoSubtitle}
                    </h3>
                    <p
                        className={`text-slate-400 pl-1 text-xs ${isExpanded ? "whitespace-normal" : "overflow-hidden text-ellipsis whitespace-nowrap"}`}
                    >
                        {product.description}
                    </p>
                </div>

                {/* Buy Points */}
                <div className="flex flex-col items-center flex-shrink-0">
                    {buyPoints && (
                        <div className="text-center items-center justify-center min-w-14">
                            <div className="flex items-center justify-center text-green-600">
                                <FaPlusCircle className="mr-1 text-sm" />
                                <p className="text-sm font-semibold">{buyPoints}</p>
                            </div>
                            <p className="text-xs text-slate-500">premio</p>
                        </div>
                    )}
                </div>

                {/* Separator */}
                {buyPoints && rewardPoints && (
                    <div className="border-l border-dotted border-gray-300 h-10 mx-2 hidden sm:block"></div>
                )}

                {/* Reward Points / Free Box */}
                <div className="flex flex-col items-center flex-shrink-0">
                    {rewardPoints ? (
                        <div
                            className={`text-center items-center justify-center min-w-14 ${isDisabled ? "opacity-40 grayscale" : ""}`}
                        >
                            <div className="flex items-center justify-center text-amber-600">
                                <IoTicketOutline className="mr-1 text-sm" />
                                <p className="text-sm font-semibold">{rewardPoints}</p>
                            </div>
                            <p className="text-xs text-slate-500">valor</p>
                        </div>
                    ) : (
                        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-md text-xs font-semibold">
                            Gratis
                        </div>
                    )}
                </div>
            </div>
        </li>
    );
};
