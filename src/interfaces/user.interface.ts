import { CompanyLogo } from ".";

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
    } | null;
    Cards: {
        id: string;
        points: number;
        favourite: boolean; // Change this to boolean here as well
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
    }[]
    createdAt: Date;
    updatedAt: Date;
}

export type UserRole = 'CLIENT' | 'USER' | 'ADMIN'
