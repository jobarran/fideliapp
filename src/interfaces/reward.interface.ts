import { ProductType } from "@prisma/client";

export interface Reward {
  id: string;
  points: number;
  description: string | null;
  productName: string;
  productType: ProductType;
  productImageUrl?: string;
  companyName: string;
  companyLogoUrl?: string;
  companyBackgroundColor: string;
  companySlug: string;
  companyLat?: number;
  companyLng?: number;
}