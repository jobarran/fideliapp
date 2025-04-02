import React from "react";
import { AiOutlineClose } from "react-icons/ai";

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
    setProductType
}: Props) => {
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

            {/* Product Type Dropdown */}
            <select
                className="border px-3 py-2 h-10 rounded-md text-sm w-full sm:w-auto bg-white focus:outline-none"
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
            >
                <option value="">Todos</option>
                <option value="PRODUCT">Producto</option>
                <option value="PROMOTION">Promoción</option>
            </select>
        </div>
    );
};
