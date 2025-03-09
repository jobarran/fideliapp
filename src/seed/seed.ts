import { UserPermission, UserRole } from '@prisma/client';
import bcryptjs from 'bcryptjs';

export interface SeedUser {
  name: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  permission?: UserPermission;
  image?: string;
}

export interface SeedCompany {
  userEmail: string;
  name: string;
  activityType: string;
  backgroundColor: string;
  textColor: string;
  address: string;
  lat: number;
  lng: number;
  openDays: string;
  openHours: string;
  logo: string;
  instagram: string;
  facebook: string;
  twitter: string;
  whatsapp: string;
  phone: string;
  site: string;
}

export interface SeedActivityType {
  name: string;
  category: 'PRODUCT' | 'SERVICE';
  subCategoryName: string;
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
      permission: UserPermission.TOTAL,
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
      backgroundColor: '#e12229',
      textColor: '#FFFFFF',
      address: 'Elcano 3288',
      lat: -34.574088289446046,
      lng: -58.45966730369283,
      openDays: 'Lun-Vie',
      openHours: '8-20',
      logo: 'bakery.jpg',
      instagram: 'bakery',
      facebook: 'bakery',
      twitter: 'bakery',
      whatsapp: '1234567890',
      phone: '1234567890',
      site: 'bakery.com',
    },
    {
      userEmail: 'bob.johnson@fidelia.com',
      name: 'Crisol',
      activityType: 'Cafe',
      backgroundColor: '#83a69c',
      textColor: '#FFFFFF',
      address: 'Cap. Gral. Ramón Freire 1502',
      lat: -34.57249502027996,
      lng: -58.458076927227566,
      openDays: 'Lun-Vie',
      openHours: '8-20',
      logo: 'crisol.png',
      instagram: 'crisol',
      facebook: 'crisol',
      twitter: 'crisol',
      whatsapp: '9876543210',
      phone: '9876543210',
      site: 'crisol.com',
    },
    {
      userEmail: 'charlie.brown@fidelia.com',
      name: 'Gorrion',
      activityType: 'Cafe',
      backgroundColor: '#2a2627',
      textColor: '#FFFFFF',
      address: 'Superi 1408',
      lat: -34.57430294810942,
      lng: -58.45943326844991,
      openDays: 'Lun-Vie',
      openHours: '8-20',
      logo: 'gorrion.jpg',
      instagram: 'gorrion',
      facebook: 'gorrion',
      twitter: 'gorrion',
      whatsapp: '2345678901',
      phone: '2345678901',
      site: 'gorrion.com',
    },
    {
      userEmail: 'david.wilson@fidelia.com',
      name: 'Nucha',
      activityType: 'Cafe',
      backgroundColor: '#db262f',
      textColor: '#FFFFFF',
      address: 'Av de los Incas 3390',
      lat: -34.573443693251036,
      lng: -58.46138831585131,
      openDays: 'Lun-Vie',
      openHours: '8-20',
      logo: 'nucha.jpg',
      instagram: 'nucha',
      facebook: 'nucha',
      twitter: 'nucha',
      whatsapp: '3456789012',
      phone: '3456789012',
      site: 'nucha.com',
    },
    {
      userEmail: 'eve.davis@fidelia.com',
      name: 'Havanna',
      activityType: 'Cafe',
      backgroundColor: '#fed008',
      textColor: '#FFFFFF',
      address: 'Av. Elcano 3335',
      lat: -34.574565726063355,
      lng: -58.4599945443418,
      openDays: 'Lun-Vie',
      openHours: '8-20',
      logo: 'havanna.png',
      instagram: 'havanna',
      facebook: 'havanna',
      twitter: 'havanna',
      whatsapp: '4567890123',
      phone: '4567890123',
      site: 'havanna.com',
    },
    {
      userEmail: 'eve.davis@fidelia.com',
      name: 'Verdin',
      activityType: 'Cafe',
      backgroundColor: '#6B8E68',
      textColor: '#FFFFFF',
      address: 'Zapiola 1514',
      lat: -34.571358100310945,
      lng: -58.45741688473838,
      openDays: 'Lun-Vie',
      openHours: '8-20',
      logo: 'verdin.jpg',
      instagram: 'verdin',
      facebook: 'verdin',
      twitter: 'verdin',
      whatsapp: '5678901234',
      phone: '5678901234',
      site: 'verdin.com',
    },
    {
      userEmail: 'frank.garcia@fidelia.com',
      name: 'Cafe Martinez',
      activityType: 'Cafe',
      backgroundColor: '#0b5d56',
      textColor: '#FFFFFF',
      address: 'Virrey del Pino 2765',
      lat: -34.56819122099298,
      lng: -58.456108349971444,
      openDays: 'Lun-Vie',
      openHours: '8-20',
      logo: 'martinez.jpg',
      instagram: 'cafemartinez',
      facebook: 'cafemartinez',
      twitter: 'cafemartinez',
      whatsapp: '6789012345',
      phone: '6789012345',
      site: 'cafemartinez.com',
    },
    {
      userEmail: 'grace.martinez@fidelia.com',
      name: 'Starbucks',
      activityType: 'Cafe',
      backgroundColor: '#086747',
      textColor: '#FFFFFF',
      address: 'Ecano 3179',
      lat: -34.57285671084644,
      lng: -58.459497088479445,
      openDays: 'Lun-Vie',
      openHours: '8-20',
      logo: 'starbucks.jpg',
      instagram: 'starbucks',
      facebook: 'starbucks',
      twitter: 'starbucks',
      whatsapp: '6789012345',
      phone: '6789012345',
      site: 'starbucks.com'
    },
    {
      userEmail: 'hank.lee@fidelia.com',
      name: 'Tienda de cafe',
      activityType: 'Cafe',
      backgroundColor: '#4F4F4F',
      textColor: '#FFFFFF',
      address: 'Elcano 3189',
      lat: -34.57303351952609,
      lng: -58.45963808780269,
      openDays: 'Lun-Vie',
      openHours: '8-20',
      logo: 'tienda-de-cafe.jpg',
      instagram: 'tienda-de-cafe',
      facebook: 'tienda-de-cafe',
      twitter: 'tienda-de-cafe',
      whatsapp: '6789012345',
      phone: '6789012345',
      site: 'tienda-de-cafe.com'
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