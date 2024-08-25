export interface Company {
  id: string;
  name: string;
  activityTypeId: string;
  backgroundColor: string | null;
  acceptReferral: boolean;
  address: string | null;
  lat: number | null;
  lng: number | null;
  openDays: string | null;
  openHours: string | null;
  userId: string;
  CompanyLogo: CompanyLogo | null;
  user: {
    name: string;
    lastName: string;
  };
};

export interface CompanyLogo {
  url: string;
}

export interface CompanyLocation {
  lat: number;
  lng: number;
  name: string;
  address: string;
  openDays: string;
  openHours: string;
};