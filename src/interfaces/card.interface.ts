import { TransactionState } from "@prisma/client";
import { CompanyLogo } from ".";
import { TransactionProductSnapshot } from "./transacrion.interface";

export interface ActivityType {
    id: string;
    name: string;
    category: 'PRODUCT' | 'SERVICE';
    subCategoryId: string | null;
}

export interface Card {
    id: string;
    points: number;
    favourite: boolean;
    active: boolean;
    userId: string;
    companyId: string;
    user: {
        name: string;
        lastName: string;
    };
    company: {
        name: string;
        activityTypeId: string;
        backgroundColor: string | null;
        slug: string;
        CompanyLogo: {
            id: string;
            url: string;
            companyId: string;
        } | null;
    };
    History: {
        id: string;
        points: number;
        date: Date;
        type: 'BUY' | 'REWARD' | 'MANUAL';
        cardId: string;
        state: TransactionState;
    }[];
}



export interface CardProfile {
    id: string;
    points: number;
    favourite: boolean;
    active: boolean;
    userId: string;
    companyId: string;
    History: {
        id: string;
        points: number;
        date: Date;
        type: 'BUY' | 'REWARD' | 'MANUAL';
        cardId: string;
        state: TransactionState;
        transactionProducts: TransactionProductSnapshot[];
    }[];
}

export interface UserCard {
    id: string;
    points: number;
    favourite: boolean; // Change this to boolean
    company: {
        name: string;
        backgroundColor: string;
        slug: string;
        activityTypeId: string;
        CompanyLogo: CompanyLogo | null;
    };
    History: {
        id: string;
        points: number;
        date: Date;
        type: 'BUY' | 'REWARD' | 'MANUAL';
        cardId: string;
    }[];
}