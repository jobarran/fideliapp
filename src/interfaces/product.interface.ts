import { ProductType, TransactionType } from "@prisma/client";

export interface Product {
    id: string;
    name: string;
    description: string | null;
    companyId: string;
    active: boolean;
    productType: ProductType
    templates: PointTransactionTemplate[];
    ProductImage: ProductImage | null; // Allow single object or array
}

export interface PointTransactionTemplate {
    id: string;
    description: string | null;
    points: number;
    type: TransactionType;
    productId: string;
    free: boolean
}

interface ProductImage {
    id: string;
    url: string;
    productId: string;
}

