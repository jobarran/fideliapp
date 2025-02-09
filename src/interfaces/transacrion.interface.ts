import { TransactionState, TransactionType } from "@prisma/client";
import { Product } from "./product.interface";

// A snapshot of a product as recorded in a transaction.
export interface TransactionProductSnapshot {
  /** The unique ID of this transaction product record */
  id: string;
  /** The ID of the product (or a dummy value in case of manual transactions) */
  productId: string;
  /** The product name at the time of transaction */
  productName: string;
  /** The individual product point value (snapshot) */
  productPoints: number;
  /** The quantity purchased/used in the transaction */
  quantity: number;
}

/** A generic Transaction interface that uses snapshot data for its products */
export interface Transaction {
  id: string;
  points: number;
  date: string;
  type: "BUY" | "REWARD" | "MANUAL";
  description?: string;
  cardId: string;
  companyId: string;
  clientName: string;
  clientLastName: string;
  state: TransactionState;
  transactionProducts: TransactionProductSnapshot[];
}

export interface CompanyTransaction {
  id: string;
  points: number;
  date: string;
  state: TransactionState;
  type: "BUY" | "REWARD" | "MANUAL";
  description?: string;
  cardId: string;
  companyId: string;
  clientName: string;
  clientLastName: string;
  userName: string;
  userLastName: string;
  userId: string;
  transactionProducts: TransactionProductSnapshot[];
}

/** A Transaction object formatted for User views.
 *  It uses the snapshot data for transaction products along with display-specific fields.
 */
export interface UserTransaction {
  companyName: string;
  id: string;
  points: number;
  date: string;
  type: "BUY" | "REWARD" | "MANUAL";
  description?: string;
  cardId: string;
  state: TransactionState;
  userId: string;
  transactionProducts: TransactionProductSnapshot[];
}
