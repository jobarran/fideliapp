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
  lat: number;
  lng: number;
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
      address: 'Elcano 3288',
      lat: -34.574088289446046,
      lng: -58.45966730369283,
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
      address: 'Cap. Gral. Ramón Freire 1502',
      lat: -34.57249502027996,
      lng: -58.458076927227566,
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
      lat: -34.57430294810942,
      lng: -58.45943326844991,
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
      address: 'Av de los Incas 3390',
      lat: -34.573443693251036,
      lng: -58.46138831585131,
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
      address: 'Av. Elcano 3335',
      lat: -34.574565726063355,
      lng: -58.4599945443418,
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
      address: 'Zapiola 1514',
      lat: -34.571358100310945,
      lng: -58.45741688473838,
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
      address: 'Virrey del Pino 2765',
      lat: -34.56819122099298,
      lng: -58.456108349971444,
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
      address: 'Ecano 3179',
      lat: -34.57285671084644,
      lng: -58.459497088479445,
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
      address: 'Elcano 3189',
      lat: -34.57303351952609,
      lng: -58.45963808780269,
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