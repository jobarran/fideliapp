import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaCheck, FaPercent } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";

interface Props {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    productType: string;
    setProductType: (value: string) => void;
}

export const ClientContentProductsFilter = ({
    searchTerm,
    setSearchTerm,
    productType,
    setProductType,
}: Props) => {
    const isActive = (type: string) => productType === type;

    return (
        <div className="flex flex-col sm:flex-row items-center gap-2">
            {/* Search Input */}
            <div className="relative flex items-center w-full">
                <input
                    type="text"
                    placeholder="Buscar por nombre"
                    className="flex-1 border px-3 h-10 py-2 rounded-md text-sm w-full focus:outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                    <button
                        className="absolute right-3 text-gray-400 hover:text-gray-600"
                        onClick={() => setSearchTerm("")}
                        aria-label="Clear search"
                    >
                        <AiOutlineClose size={18} />
                    </button>
                )}
            </div>

            {/* Product Type Buttons */}
            <div className="flex gap-2 w-full sm:w-auto">
                <button
                    onClick={() => setProductType("PRODUCT")}
                    className={`px-4 h-10 py-2 rounded-md text-sm border w-full flex items-center justify-center gap-2 sm:w-auto
            ${isActive("PRODUCT") ? "bg-slate-800 text-white" : "bg-white text-slate-800"}
        `}
                >
                    <span className={`flex items-center justify-center w-5 h-5 rounded-full
            ${isActive("PRODUCT") ? "bg-white text-slate-700" : "bg-slate-200 text-slate-700"}
        `}>
                        <FiPackage size={10} />
                    </span>
                    <span>Productos</span>
                </button>

                <button
                    onClick={() => setProductType("PROMOTION")}
                    className={`px-4 h-10 py-2 rounded-md text-sm border w-full sm:w-auto flex items-center justify-center gap-2
                        ${isActive("PROMOTION") ? "bg-red-600 text-white" : "bg-white text-slate-800"}
        `}
                >
                    <span className={`flex items-center justify-center w-5 h-5 rounded-full
            ${isActive("PROMOTION") ? "bg-white text-red-600" : "bg-slate-200 text-slate-700"}
        `}>
                        <FaPercent size={10} />
                    </span>
                    <span>Promociones</span>
                </button>

            </div>
        </div>
    );
};
