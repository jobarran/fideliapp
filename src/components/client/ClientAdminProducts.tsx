"use client";

import { ClientAdminProductTable } from '..';
import { Product } from '@/interfaces';

type FormInputs = {
    name: string;
    description?: string;
    companyId: string;
    buyPoints?: number;
    rewardPoints?: number;
    image?: FileList; // Optional for image upload
};

interface Props {
    userId: string;
    products: Product[]
}

export const ClientAdminProducts = ({ products, userId }: Props) => {

    return (

        <div className="flex flex-col border border-gray-200 rounded-md w-full bg-white p-4 max-h-full max-w-full">
            <h2 className="text-lg font-semibold text-gray-700">Productos</h2>
            <ClientAdminProductTable
                products={products}
                userId={userId}
            />
        </div>
    );
};
