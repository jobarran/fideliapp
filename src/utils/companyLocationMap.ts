
// Define the type for the location data

import { Company, CompanyLocation } from "@/interfaces";


export async function companyLocationsMap(companies:Company[]): Promise<CompanyLocation[]> {
  
    return companies.map((company:Company) => ({
      lat: company.lat ?? 0, 
      lng: company.lng ?? 0, 
      name: company.name,
      slug: company.slug,
      address: company.address || '',
      openHours: company.openHours || '',
      activityType: company.activityType.name, 
      logoUrl: company.CompanyLogo?.url || '' 
    }));
  }