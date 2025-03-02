import { TransactionState } from "@prisma/client";
import { CompanyLogo } from ".";
import { Review, TransactionProductSnapshot } from "./transacrion.interface";

export interface User {
    id: string;
    name: string;
    lastName: string;
    email: string;
    role: string;
    active: boolean;
}

export interface UserProfileData {
    id: string;
    name: string;
    lastName: string;
    email: string;
    active: boolean;
    role: UserRole;
    Company?: {
        name: string;
        backgroundColor: string;
        slug: string;
        activityTypeId: string;
        active: boolean;
    } | null;
    Cards: {
        id: string;
        points: number;
        favourite: boolean;
        company: {
            name: string;
            backgroundColor: string;
            slug: string;
            activityTypeId: string;
            CompanyLogo: CompanyLogo | null;
            id: string;
            active: boolean;
        };
        History: {
            id: string;
            points: number;
            date: Date;
            type: 'BUY' | 'REWARD' | 'MANUAL';
            cardId: string;
            state: TransactionState;
            transactionProducts: TransactionProductSnapshot[];
            companyReview: Review | null
        }[];
    }[]
    createdAt: Date;
    updatedAt: Date;
}

export type UserRole = 'CLIENT' | 'USER' | 'ADMIN'
