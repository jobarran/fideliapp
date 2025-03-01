export interface Company {
  id: string;
  name: string;
  activityType: {
    name: string;
    id: string;
  };
  backgroundColor: string | null;
  acceptReferral: boolean;
  active: boolean;
  address: string | null;
  slug: string;
  lat: number | null;
  lng: number | null;
  averageRating: number
  openHours: Record<string, {
    from: string;
    to: string;
    closed: boolean;
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
  slug: string;
  address: string;
  openHours: {
    [key: string]: { // Using string index to represent days of the week
      from: string; // Opening time in HH:mm format
      to: string;   // Closing time in HH:mm format
      closed: boolean; // Optional property for closed days
    };
  };
  activityType: string;  // New property for activity type
  logoUrl: string;       // New property for company logo URL
}

export interface CompanyFilters {
  name: string;
  activityTypeId: string[];
}

export interface CompanyClientDashboard {
  id: string;
  name: string;
  activityType: {
    name: string;
    id: string;
  };
  activityTypeId: string;
  backgroundColor: string;
  acceptReferral: boolean;
  active: boolean;
  address: string;
  slug: string;
  lat: number | null;
  lng: number | null;
  openHours: Record<string, {
    from: string;
    to: string;
    closed: boolean;
  }> | {} | null;
  userId: string;
  CompanyLogo: CompanyLogo | null;
}

export interface CompanyClientInformation {
  id: string;
  name: string;
  activityType: {
    name: string;
    id: string;
  };
  activityTypeId: string;
  backgroundColor: string;
  acceptReferral: boolean;
  active: boolean;
  address: string;
  slug: string;
  lat: number | null;
  lng: number | null;
  openHours: Record<string, {
    from: string;
    to: string;
    closed: boolean;
  }>
  userId: string;
  CompanyLogo: CompanyLogo | null;
}

export interface DayHours {
  closed: boolean;
  from: string;
  to: string;
}

export interface CompanyShort {
  name: string;
  backgroundColor: string;
  slug: string;
  activityTypeId: string;
  CompanyLogo?: CompanyLogo | null;  // Make CompanyLogo optional
}
