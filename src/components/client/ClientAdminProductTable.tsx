"use client";

import { Product } from "@/interfaces";
import React, { useState, useCallback } from "react";
import { ClientContentProductsFilter } from "./ClientContentProductsFilter";
import { useProductFilter } from "@/hooks/useProductFilter";
import { ClientAdminProductTableRow } from "..";
import Link from "next/link";
import { FaPlusCircle } from "react-icons/fa";
import { IoTicketOutline } from "react-icons/io5";
import { updateProduct } from "@/actions";

interface Props {
    products: Product[];
    userId: string;
}

export const ClientAdminProductTable = ({ products, userId }: Props) => {
    
    const [searchTerm, setSearchTerm] = useState("");
    const [productType, setProductType] = useState(""); // New state for product type
    const [editingProductId, setEditingProductId] = useState<string | null>(null);
    const [updatedProducts, setUpdatedProducts] = useState(products);

    const { visibleProducts } = useProductFilter(products, searchTerm, productType);

    const sortedProducts = [...visibleProducts].sort((a, b) =>
        a.name.localeCompare(b.name)
    );

    const handleSave = useCallback(
        async (product: Product) => {
            try {
                const response = await updateProduct(product, userId);
                if (response.ok) {
                    setUpdatedProducts((prevProducts) =>
                        prevProducts.map((p) =>
                            p.id === product.id ? { ...p, ...product } : p
                        )
                    );
                    setEditingProductId(null);
                } else {
                    throw new Error("Failed to update product");
                }
            } catch (error) {
                console.error(error);
            }
        },
        [userId]
    );

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <div className="flex my-2 gap-2">
                <div className="flex-grow">
                    <ClientContentProductsFilter
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        productType={productType}
                        setProductType={setProductType}
                    />
                </div>
                <Link
                    href={`/client/${userId}/products/new`}
                    className="border border-slate-200 text-slate-800 text-sm py-2 px-2 rounded-lg hover:bg-slate-100 flex items-center justify-center"
                    >
                    <p>Agregar</p>
                </Link>
            </div>

            {/* Table container */}
            <div className="flex-grow overflow-auto border border-gray-200 rounded-md mt-2">
                <table className="w-full">
                    <thead>
                        <tr className="bg-slate-50 text-slate-800 rounded-md">
                            <th className="w-24 text-center text-xs font-semibold p-3">Estado</th>
                            <th className="w-16 text-center text-xs font-semibold p-3">Imagen</th>
                            <th className="max-w-[150px] text-left text-xs font-semibold p-3">
                                Nombre
                            </th>
                            <th className="min-w-[200px] text-left text-xs font-semibold p-3">
                                Descripción
                            </th>
                            <th className="w-24 text-center text-xs font-semibold p-3">Tipo</th>
                            <th className="w-16 text-center text-xs font-semibold p-3">
                                <div className="flex items-center justify-center text-green-600">
                                    <FaPlusCircle className="mr-1 text-xs" />
                                    Premio
                                </div>
                            </th>
                            <th className="w-16 text-center text-xs font-semibold p-3">
                                <div className="flex items-center justify-center text-amber-600">
                                    <IoTicketOutline className="mr-1 text-xs" />
                                    Valor
                                </div>
                            </th>
                            <th className="w-16 text-center text-xs font-semibold p-3">
                                Editar
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedProducts.map((product) => (
                            <ClientAdminProductTableRow
                                key={product.id}
                                product={product}
                                userId={userId}
                                isEditing={editingProductId === product.id}
                                onSave={handleSave}
                                onEdit={() => setEditingProductId(product.id)}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
