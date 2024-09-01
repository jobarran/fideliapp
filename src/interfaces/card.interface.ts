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
    userId: string;
    companyId: string;
    user: {
        name: string;
        lastName: string;
    };
    company: {
        name: string;
        activityType: ActivityType; 
        backgroundColor: string | null;
        CompanyLogo: {
            id: string;
            url: string;
            companyId: string;
        } | null;
    };
}
