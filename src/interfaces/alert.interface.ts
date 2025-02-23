import { AlertStatus } from "@prisma/client";

export interface Alert {
  id: string;
  type: string;
  status: AlertStatus;
  user: {
    id: string;
    name: string;
    lastName: string;
  };
  company: {
    id: string;
    name: string;
  } | null; // Company is optional since it may not always exist
  pointTransaction: {
    id: string;
    points: number;
    date: string; // ISO string
    state: string;
    description: string | null;
  } | null; // Optional field if no transaction exists
}
