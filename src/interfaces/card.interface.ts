export interface ActivityType {
    id: string;
    name: string;
    category: 'PRODUCT' | 'SERVICE';
    subCategoryId: string | null;
}

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
        activityType: ActivityType; // Update this to match the actual structure
        backgroundColor: string | null;
        CompanyLogo: {
            id: string;
            url: string;
            companyId: string;
        } | null;
    };
}
