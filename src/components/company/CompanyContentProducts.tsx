"use client";

import { CompanyContentProduct } from '..';
import { Product } from '@/interfaces';



interface Props {
    companyId: string;
    products: Product[]
}

export const CompanyContentProducts = ({ products }: Props) => {

    return (
        <div>
            <CompanyContentProduct products={products} />
        </div>
    );
};
