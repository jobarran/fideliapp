
export interface User {
    id: string;
    name: string;
    lastName: string;
    email: string;
    role: string;
    image?: string;
}



export type UserRole = 'CLIENT' | 'USER' | 'ADMIN'
