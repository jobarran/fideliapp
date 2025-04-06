"use client";

import { Product } from "@/interfaces";
import { TransactionType } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { FaMinusCircle, FaPlusCircle, FaRegImage, FaTimes } from "react-icons/fa";

interface Props {
    handleTransactionTypeSelect: (type: TransactionType) => void;
    selectedTransactionType: TransactionType | null;
    manualPoints: number;
    setManualPoints: (value: number) => void;
    manualTransactionType: "Otorgar" | "Quitar";
    setManualTransactionType: (value: "Otorgar" | "Quitar") => void;
    availablePoints: number;
    manualDescription: string;
    setManualDescription: (value: string) => void;
    filteredProducts: Product[];
    selectedProducts: Record<string, number>;
    handleProductSelect: (id: string) => void;
    handleQuantityChange: (id: string, increment: boolean) => void;
}

export const ClientAdminTransactionSource = ({
    handleTransactionTypeSelect,
    selectedTransactionType,
    manualPoints,
    setManualPoints,
    manualTransactionType,
    setManualTransactionType,
    availablePoints,
    manualDescription,
    setManualDescription,
    filteredProducts,
    selectedProducts,
    handleProductSelect,
    handleQuantityChange,
}: Props) => {

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [activeFilter, setActiveFilter] = useState<string | null>(null);

    useEffect(() => {
        setActiveFilter(null)
    }, [selectedTransactionType, setActiveFilter])

    const transactionTypes = [
        { type: TransactionType.BUY, label: "Compra" },
        { type: TransactionType.REWARD, label: "Recompensa" },
        { type: TransactionType.MANUAL, label: "Manual" },
    ];

    const isExceedingPoints = manualPoints > availablePoints;

    const filteredAndSearchedProducts = filteredProducts
        .filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .filter((product) => (activeFilter ? product.productType === activeFilter : true));

    const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (value >= 0) {
            setManualPoints(value);
        }
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length <= 50) {
            setManualDescription(value);
        }
    };

    return (
        <div
            className={`flex flex-col border border-gray-200 rounded-md w-full bg-white p-4 gap-4 max-w-full overflow-hidden ${selectedTransactionType === TransactionType.MANUAL ? "h-auto" : "h-[90vh]"
                }`}
        >
            <h2 className="text-base font-semibold text-gray-700">Transacción</h2>

            {/* Transaction Type Selection */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4">
                <div className="flex flex-col items-center md:items-start">
                    <p className="text-xs font-medium text-gray-700 mb-2">
                        Seleccione tipo de operación
                    </p>
                    <div className="flex space-x-3">
                        {transactionTypes.map(({ type, label }) => (
                            <button
                                key={type}
                                onClick={() => handleTransactionTypeSelect(type)}
                                className={`px-2 py-2 rounded-md font-medium text-xs sm:text-xs transition ${selectedTransactionType === type
                                    ? "bg-slate-800 text-white"
                                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Transaction Form */}
            {selectedTransactionType && (
                <>
                    {selectedTransactionType === TransactionType.MANUAL ? (
                        <div className="mt-4 space-y-4">
                            {/* Manual Points Input */}
                            <div className="flex items-center space-x-4">
                                {/* Transaction Type Selection */}
                                <div className="flex-1">
                                    <label className="text-xs font-medium text-slate-800">
                                        Tipo de Transacción manual:
                                    </label>
                                    <select
                                        value={manualTransactionType}
                                        onChange={(e) =>
                                            setManualTransactionType(
                                                e.target.value as "Otorgar" | "Quitar"
                                            )
                                        }
                                        className="mt-1 w-full text-xs border border-gray-200 rounded-lg px-3 py-2"
                                    >
                                        <option value="Otorgar">Otorgar</option>
                                        <option value="Quitar">Quitar</option>
                                    </select>
                                </div>

                                <div className="flex-1">
                                    <label className="text-xs font-medium text-slate-800">
                                        Puntos:
                                    </label>
                                    <input
                                        type="number"
                                        value={manualPoints}
                                        onChange={handlePointsChange}
                                        className={`mt-1 w-full text-xs border rounded-lg px-3 py-2 ${isExceedingPoints && manualTransactionType === "Quitar"
                                            ? "border-red-500"
                                            : "border-gray-200"
                                            }`}
                                        min={0}
                                    />
                                </div>
                            </div>

                            {/* Error Message */}
                            {isExceedingPoints && manualTransactionType === "Quitar" && (
                                <p className="text-xs text-red-500">Puntos insuficientes</p>
                            )}

                            {/* Description Input */}
                            <div>
                                <label className="text-xs font-medium text-slate-800">
                                    Descripción
                                </label>
                                <input
                                    type="text"
                                    value={manualDescription}
                                    onChange={handleDescriptionChange}
                                    maxLength={50}
                                    className="mt-1 w-full text-xs border rounded-lg px-3 py-2"
                                />
                                <p className="text-xs text-gray-500 my-1">
                                    {manualDescription.length}/50
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col h-full overflow-hidden gap-4">

                            {/* Search and Filter Buttons */}
                            <div className="flex flex-col sm:flex-row gap-2 items-center w-full">
                                <input
                                    type="text"
                                    placeholder="Buscar producto..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="border text-xs px-3 py-2 rounded-md flex-1 w-full"
                                />
                                {selectedTransactionType === TransactionType.REWARD && (
                                    <div className="flex gap-2 items-center w-full sm:w-auto">
                                        <button
                                            className={`px-3 py-2 text-xs rounded-md border w-full sm:w-auto ${activeFilter === "PRODUCT" ? "bg-slate-800 text-white" : "bg-white text-slate-800"}`}
                                            onClick={() => setActiveFilter(activeFilter === "PRODUCT" ? null : "PRODUCT")}
                                        >
                                            Productos
                                        </button>
                                        <button
                                            className={`px-3 py-2 text-xs rounded-md border w-full sm:w-auto ${activeFilter === "PROMOTION" ? "bg-slate-800 text-white" : "bg-white text-slate-800"}`}
                                            onClick={() => setActiveFilter(activeFilter === "PROMOTION" ? null : "PROMOTION")}
                                        >
                                            Promociones
                                        </button>
                                    </div>
                                )}
                            </div>


                            {/* Product List */}
                            <div className="flex-1 overflow-y-auto border rounded-md">
                                {filteredAndSearchedProducts.map((product) => {
                                    const isChecked = Boolean(selectedProducts[product.id]);
                                    const isPromotion = product.productType === "PROMOTION";
                                    const [firstPart, ...restParts] = product.name.split("-");
                                    return (
                                        <div
                                            key={product.id}
                                            className="flex items-center justify-between p-2 border-b border-gray-100 last:border-none"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={isChecked}
                                                onChange={() => handleProductSelect(product.id)}
                                                className="mr-4"
                                            />
                                            <div
                                                className={`w-7 h-7 rounded-full overflow-hidden bg-gray-200 mr-2 flex items-center justify-center`}
                                            >
                                                {product.ProductImage ? (
                                                    <img
                                                        src={product.ProductImage.url}
                                                        alt={product.name}
                                                        className="object-cover"
                                                        width={0}
                                                        height={0}
                                                        style={{ width: '100%', height: '100%' }}
                                                    />
                                                ) : (
                                                    <FaRegImage className="text-base text-slate-300" />
                                                )}
                                            </div>
                                            <span className="flex-1 text-xs font-medium text-gray-800 truncate flex items-center gap-2">
                                                {isPromotion && (
                                                    <span className="bg-red-500 text-white px-2 py-1 rounded text-xs">
                                                        {firstPart}
                                                    </span>
                                                )}
                                                {isPromotion ? restParts.join("-") : product.name}
                                            </span>
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => handleQuantityChange(product.id, false)}
                                                    disabled={!isChecked || selectedProducts[product.id] <= 1}
                                                    className={`${isChecked ? "text-gray-800" : "text-gray-300"}`}
                                                >
                                                    <FaMinusCircle className="text-xs" />
                                                </button>
                                                <span className="text-xs font-medium text-gray-700">
                                                    {selectedProducts[product.id] || 1}
                                                </span>
                                                <button
                                                    onClick={() => handleQuantityChange(product.id, true)}
                                                    disabled={!isChecked}
                                                    className={`${isChecked ? "text-gray-800" : "text-gray-300"}`}
                                                >
                                                    <FaPlusCircle className="text-xs" />
                                                </button>
                                            </div>
                                            <span className="ml-4 min-w-6 text-xs font-medium text-gray-900 text-right">
                                                {product.templates
                                                    .filter((template) =>
                                                        selectedTransactionType === TransactionType.BUY
                                                            ? template.type === "BUY"
                                                            : template.type === "REWARD"
                                                    )
                                                    .reduce((sum, template) => sum + template.points, 0)}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
