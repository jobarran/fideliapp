import { CompanyLogo } from "./company.interface";

export interface Card {
    id: string;
    points: number;
    userId: string;
    companyId: string;
    user: {
        name: string;
        lastName: string;
    };
    company: {
        name: string;
        activityType: string;
        backgroundColor: string | null; // Allow null
        CompanyLogo: {
            id: string;
            url: string;
            companyId: string;
        } | null;
    };
}