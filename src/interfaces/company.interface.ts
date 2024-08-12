
export interface Company {
    id: string;
    name: string;
    activityType: string;
    backgroundColor: string | null;
    acceptReferral: boolean;
    address: string | null;
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