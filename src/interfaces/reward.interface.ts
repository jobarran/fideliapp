export interface Reward {
    id: string;
    points: number;
    description: string | null; 
    productName: string;
    productImageUrl?: string; 
    companyName: string;
    companyLogoUrl?: string;
    companyBackgroundColor: string;
    companySlug: string;
    companyLat?: number;
    companyLng?: number;
  }