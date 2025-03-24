"use client";

import { ClientAdminProductTable } from "..";
import { Product } from "@/interfaces";

interface Props {
    userId: string;
    products: Product[];
}

export const ClientAdminProducts = ({ products, userId }: Props) => {
    return (
        <div className="flex flex-col border border-gray-200 rounded-md w-full bg-white p-4 h-[90vh] max-w-full overflow-auto">
            <h2 className="text-lg font-semibold text-gray-700">Productos</h2>
            <div className="flex-grow overflow-hidden">
                <ClientAdminProductTable products={products} userId={userId} />
            </div>
        </div>
    );
};
