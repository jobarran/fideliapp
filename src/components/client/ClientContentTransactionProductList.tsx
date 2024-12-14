"use client"

import { Product } from "@/interfaces";
import React, { useState } from "react";
import { FaMinusCircle, FaPlusCircle, FaTimes } from "react-icons/fa";

interface Props {
    filteredProducts: Product[];
    selectedProducts: Record<string, number>;
    handleProductSelect: (id: string) => void;
    handleQuantityChange: (id: string, increment: boolean) => void; // New handler
    selectedTransactionType: string;
}

export const ClientContentTransactionProductList = ({
    filteredProducts,
    selectedProducts,
    handleProductSelect,
    handleQuantityChange,
    selectedTransactionType,
}: Props) => {

    const [searchQuery, setSearchQuery] = useState<string>("");

    const filteredAndSearchedProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (

        <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-4">

            {/* Search Input */}
            {selectedTransactionType !== "MANUAL" && (

                <div className="relative mb-4">
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg text-xs"
                    />
                    {/* "X" Button */}
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                            <FaTimes />
                        </button>
                    )}
                </div>
            )}

            {filteredAndSearchedProducts.map((product) => {
                const isChecked = Boolean(selectedProducts[product.id]);

                return (
                    <div
                        key={product.id}
                        className="flex items-center justify-between p-2 border-b border-gray-100 last:border-none"
                    >
                        {/* Checkbox for selection */}
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleProductSelect(product.id)}
                            className="mr-4"
                        />

                        {/* Product Name */}
                        <span className="flex-1 text-sm font-medium text-gray-800 truncate">
                            {product.name}
                        </span>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-start space-x-2">
                            {/* Minus Button */}
                            <button
                                onClick={() => handleQuantityChange(product.id, false)}
                                className={`${isChecked ? "text-gray-800" : "text-gray-300"}`}
                                disabled={!isChecked || selectedProducts[product.id] <= 1}
                            >
                                <FaMinusCircle className="text-sm" />
                            </button>

                            {/* Quantity Display */}
                            <span className="text-xs font-medium text-gray-700">
                                {selectedProducts[product.id] || 1}
                            </span>

                            {/* Plus Button */}
                            <button
                                onClick={() => handleQuantityChange(product.id, true)}
                                className={`${isChecked ? "text-gray-800" : "text-gray-300"}`}
                                disabled={!isChecked}
                            >
                                <FaPlusCircle className="text-sm" />
                            </button>
                        </div>

                        {/* Points */}
                        <span className="ml-4 min-w-6 text-sm text-gray-900 font-medium text-right">
                            {product.templates
                                .filter((template) =>
                                    selectedTransactionType === "Compra"
                                        ? template.type === "BUY"
                                        : template.type === "REWARD"
                                )
                                .reduce((sum, template) => sum + template.points, 0)}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};
