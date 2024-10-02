export interface Company {
  id: string;
  name: string;
  activityType: {
    name: string;
    id: string;
  };
  backgroundColor: string | null;
  acceptReferral: boolean;
  address: string | null;
  slug: string;
  lat: number | null;
  lng: number | null;
  openHours: Record<string, { 
    from: string;
    to: string;
    closed?: boolean;
  }> | {}; 
  userId: string;
  CompanyLogo: CompanyLogo | null;
  user: {
    name: string;
    lastName: string;
  };
}

export interface CompanyLogo {
  url: string;
}

export interface CompanyLocation {
  lat: number;
  lng: number;
  name: string;
  address: string;
  openHours: {
    [key: string]: { // Using string index to represent days of the week
      from: string; // Opening time in HH:mm format
      to: string;   // Closing time in HH:mm format
      closed?: boolean; // Optional property for closed days
    };
  };}

export interface CompanyFilters {
  name: string;
  activityTypeId: string[];
}