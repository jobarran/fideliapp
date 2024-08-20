import { UserRole } from '@prisma/client';
import bcryptjs from 'bcryptjs';



export interface SeedUser {
  name: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  image?: string;
}

export interface SeedCompany {
  userEmail: string;
  name: string;
  activityType: string;
  backgroundColor: string;
  acceptReferral: boolean;
  address: string;
  openDays: string;
  openHours: string;
  logo: string
}

export interface SeedActivityType {
  name: string;
  category: 'PRODUCT' | 'SERVICE';
  subCategoryName: string; // Changed to subCategoryName to clarify that it's a string
}

export interface SeedSubCategory {
  name: string;
}
interface SeedData {
  users: SeedUser[];
  companies: SeedCompany[];
  activityTypes: SeedActivityType[];
  subCategories: SeedSubCategory[];
}


export const initialData: SeedData = {

  users: [
    {
      name: 'Joaquin',
      lastName: 'Barrandeguy',
      email: 'jbarrandeguy@fidelia.com',
      password: bcryptjs.hashSync('123456'),
      role: UserRole.ADMIN,
    },
    {
      name: 'Martina',
      lastName: 'De Luca',
      email: 'mdeluca@fidelia.com',
      password: bcryptjs.hashSync('123456'),
      role: UserRole.USER,
    },
    {
      name: 'Alice',
      lastName: 'Smith',
      email: 'alice.smith@fidelia.com',
      password: bcryptjs.hashSync('123456'),
      role: UserRole.CLIENT,
    },
    {
      name: 'Bob',
      lastName: 'Johnson',
      email: 'bob.johnson@fidelia.com',
      password: bcryptjs.hashSync('123456'),
      role: UserRole.CLIENT,
    },
    {
      name: 'Charlie',
      lastName: 'Brown',
      email: 'charlie.brown@fidelia.com',
      password: bcryptjs.hashSync('123456'),
      role: UserRole.CLIENT,
    },
    {
      name: 'David',
      lastName: 'Wilson',
      email: 'david.wilson@fidelia.com',
      password: bcryptjs.hashSync('123456'),
      role: UserRole.CLIENT,
    },
    {
      name: 'Eve',
      lastName: 'Davis',
      email: 'eve.davis@fidelia.com',
      password: bcryptjs.hashSync('123456'),
      role: UserRole.CLIENT,
    },
    {
      name: 'Frank',
      lastName: 'Garcia',
      email: 'frank.garcia@fidelia.com',
      password: bcryptjs.hashSync('123456'),
      role: UserRole.CLIENT,
    },
    {
      name: 'Grace',
      lastName: 'Martinez',
      email: 'grace.martinez@fidelia.com',
      password: bcryptjs.hashSync('123456'),
      role: UserRole.CLIENT,
    },
    {
      name: 'Hank',
      lastName: 'Lee',
      email: 'hank.lee@fidelia.com',
      password: bcryptjs.hashSync('123456'),
      role: UserRole.CLIENT,
    },

  ],

  companies: [
    {
      userEmail: 'alice.smith@fidelia.com',
      name: 'Bakery',
      activityType: 'Cafe',
      backgroundColor: '#B04E5A',
      acceptReferral: true,
      address: 'Superi 1408',
      openDays: 'Lun-Vie',
      openHours: '8-20',
      logo: 'bakery.jpg'
    },
    {
      userEmail: 'bob.johnson@fidelia.com',
      name: 'Crisol',
      activityType: 'Cafe',
      backgroundColor: '#6B8E68',
      acceptReferral: true,
      address: 'Superi 1408',
      openDays: 'Lun-Vie',
      openHours: '8-20',
      logo: 'crisol.png'
    },
    {
      userEmail: 'charlie.brown@fidelia.com',
      name: 'Gorrion',
      activityType: 'Cafe',
      backgroundColor: '#4F4F4F',
      acceptReferral: true,
      address: 'Superi 1408',
      openDays: 'Lun-Vie',
      openHours: '8-20',
      logo: 'gorrion.jpg'
    },
    {
      userEmail: 'david.wilson@fidelia.com',
      name: 'Nucha',
      activityType: 'Cafe',
      backgroundColor: '#B04E5A',
      acceptReferral: true,
      address: 'Superi 1408',
      openDays: 'Lun-Vie',
      openHours: '8-20',
      logo: 'nucha.jpg'
    },
    {
      userEmail: 'eve.davis@fidelia.com',
      name: 'Havanna',
      activityType: 'Cafe',
      backgroundColor: '#C2B784',
      acceptReferral: true,
      address: 'Superi 1408',
      openDays: 'Lun-Vie',
      openHours: '8-20',
      logo: 'havanna.jpg'
    },
    {
      userEmail: 'eve.davis@fidelia.com',
      name: 'Verdin',
      activityType: 'Cafe',
      backgroundColor: '#6B8E68',
      acceptReferral: true,
      address: 'Superi 1408',
      openDays: 'Lun-Vie',
      openHours: '8-20',
      logo: 'verdin.jpg'
    },
    {
      userEmail: 'frank.garcia@fidelia.com',
      name: 'Cafe Martinez',
      activityType: 'Cafe',
      backgroundColor: '#6B8E68',
      acceptReferral: true,
      address: 'Superi 1408',
      openDays: 'Lun-Vie',
      openHours: '8-20',
      logo: 'martinez.jpg'
    },
    {
      userEmail: 'grace.martinez@fidelia.com',
      name: 'Starbucks',
      activityType: 'Cafe',
      backgroundColor: '#6B8E68',
      acceptReferral: true,
      address: 'Superi 1408',
      openDays: 'Lun-Vie',
      openHours: '8-20',
      logo: 'starbucks.jpg'
    },
    {
      userEmail: 'hank.lee@fidelia.com',
      name: 'Tienda de cafe',
      activityType: 'Cafe',
      backgroundColor: '#4F4F4F',
      acceptReferral: true,
      address: 'Superi 1408',
      openDays: 'Lun-Vie',
      openHours: '8-20',
      logo: 'tienda-de-cafe.jpg'
    },
  ],

  activityTypes: [
    { name: 'Cafe', category: 'SERVICE', subCategoryName: 'Gastronomía' },
    { name: 'Barbería', category: 'SERVICE', subCategoryName: 'Belleza' },
    { name: 'Restaurante', category: 'SERVICE', subCategoryName: 'Gastronomía' },
    { name: 'Cervecería', category: 'PRODUCT', subCategoryName: 'Gastronomía' },
    { name: 'Librería', category: 'PRODUCT', subCategoryName: 'Cultura' },
    { name: 'Panadería', category: 'PRODUCT', subCategoryName: 'Gastronomía' },
    { name: 'Tienda de Ropa', category: 'PRODUCT', subCategoryName: 'Moda' },
    { name: 'Gimnasio', category: 'SERVICE', subCategoryName: 'Salud' },
    { name: 'Centro de Estética', category: 'SERVICE', subCategoryName: 'Belleza' },
    { name: 'Tienda de Música', category: 'PRODUCT', subCategoryName: 'Cultura' },
    { name: 'Peluquería', category: 'SERVICE', subCategoryName: 'Belleza' },
    { name: 'Cine', category: 'SERVICE', subCategoryName: 'Entretenimiento' },
    { name: 'Heladería', category: 'PRODUCT', subCategoryName: 'Gastronomía' },
  ],

  subCategories: [
    { name: 'Gastronomía' },
    { name: 'Belleza' },
    { name: 'Cultura' },
    { name: 'Moda' },
    { name: 'Salud' },
    { name: 'Entretenimiento' },
  ],

}