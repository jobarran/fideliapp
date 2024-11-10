"use client";

import { ClientContentProduct, CompanyContentProduct } from '..';
import { Product } from '@/interfaces';



interface Props {
    companyId: string;
    products: Product[]
}

export const CompanyContentProducts = ({ companyId, products }: Props) => {

    return (
        <div>
            <div className="flex justify-between items-center mt-1 mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Productos</h2>
            </div>
            <div className="mt-4">

                <CompanyContentProduct products={products}  />

            </div>
        </div>
    );
};
