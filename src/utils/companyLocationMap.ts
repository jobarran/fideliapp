
// Define the type for the location data

import { Company, CompanyLocation } from "@/interfaces";


export async function companyLocationsMap(companies:Company[]): Promise<CompanyLocation[]> {
  
    return companies.map((company:Company) => ({
      lat: company.lat ?? 0, 
      lng: company.lng ?? 0, 
      name: company.name,
      address: company.address || '',
      openHours: company.openHours || '',
    }));
  }