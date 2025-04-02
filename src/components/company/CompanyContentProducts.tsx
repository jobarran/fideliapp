"use client";

import { CompanyContentProduct } from '..';
import { Product } from '@/interfaces';



interface Props {
    companyId: string;
    products: Product[]
    companyLogo?: string
    companyColor: string
}

export const CompanyContentProducts = ({ products, companyLogo, companyColor }: Props) => {

    return (
        <div>
            <CompanyContentProduct products={products} companyLogo={companyLogo} companyColor={companyColor} />
        </div>
    );
};
