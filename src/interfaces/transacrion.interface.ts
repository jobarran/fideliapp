import { TransactionState, TransactionType } from "@prisma/client";
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

export interface CompanyTransaction {
    id: string;
    points: number;
    date: string;
    state: TransactionState;
    type: 'BUY' | 'REWARD' | 'MANUAL';
    cardId: string;
    companyId: string;
    clientName: string;
    clientLastName: string;
    userName: string;
    userLastName: string;
    userId: string;
    products: {
      id: string;
      name: string;
      active: boolean;
      companyId: string;
      description: string | null;
    }[]; // Use the exact type being returned
  }
  