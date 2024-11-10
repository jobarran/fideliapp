export interface Reward {
    id: string;
    points: number;
    description: string | null; // `description` is nullable as per your schema
    productName: string;
    productImageUrl?: string; // `productImageUrl` is optional as it might not be present
    companyName: string;
  }