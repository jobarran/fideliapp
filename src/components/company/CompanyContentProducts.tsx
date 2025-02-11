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
            <CompanyContentProduct products={products} />
        </div>
    );
};
