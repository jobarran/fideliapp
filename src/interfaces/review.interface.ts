export interface CompanyReview {
    id: string;
    rating: number;
    comment: string | null;
    createdAt: Date;
    updatedAt: Date;
    pointTransactionId: string;
    companyId: string;
    pointTransaction: PointTransaction;
    user: User
}

export interface PointTransaction {
    type: string; // Use a string literal type if there are fixed values (e.g., 'BUY' | 'SELL')
    description: string | null;
    points: number;
    transactionProducts?: TransactionProduct[]; // Optional array of transaction products
    card: Card;
}

export interface Card {
    user: User;
}

export interface User {
    name: string;
    lastName: string;
    id: string;
}

export interface TransactionProduct {
    id: string;
    quantity: number;
    productName: string;
    productPoints: number;
    productId: string;
}
