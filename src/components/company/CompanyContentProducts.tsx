"use client";

import { CompanyContentProduct } from '..';
import { Product } from '@/interfaces';



interface Props {
    companyId: string;
    products: Product[]
    companyLogo?: string
    companyColor: string
    cardPoints: number | undefined;
}

export const CompanyContentProducts = ({ products, companyLogo, companyColor, cardPoints }: Props) => {

    return (
        <div>
            <CompanyContentProduct products={products} companyLogo={companyLogo} companyColor={companyColor} cardPoints={cardPoints} />
        </div>
    );
};
