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
  openHours: {
    [key: string]: { // Using string index to represent days of the week
      from: string; // Opening time in HH:mm format
      to: string;   // Closing time in HH:mm format
      closed?: boolean; // Optional property for closed days
    };
  };
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
  openDays: string; // You may want to adjust this if needed
  openHours: string; // Consider changing this to an object if necessary
}

export interface CompanyFilters {
  name: string;
  activityTypeId: string[];
}