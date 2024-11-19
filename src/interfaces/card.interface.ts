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
        activityType: ActivityType;
        backgroundColor: string | null;
        slug: string;
        CompanyLogo: {
            id: string;
            url: string;
            companyId: string;
        } | null;
    };
}


export interface CardProfile {
    id: string;
    points: number;
    favourite: boolean;
    active: boolean;
    userId: string;
    companyId: string;
}