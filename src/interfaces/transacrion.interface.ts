import { TransactionState } from "@prisma/client";
import { Product } from "./product.interface";

export interface Transaction {
    id: string;
    points: number;
    date: string;
    type: 'BUY' | 'REWARD' | 'MANUAL';
    cardId: string;
    companyId: string;
    clientName: string;
    clientLastName: string;
    state: TransactionState
    products: Product[];
}