'use server';

import { Company } from '@/interfaces';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const getAllCompanies = async (): Promise<Company[]> => {
  try {
    const companies = await prisma.company.findMany({
      include: {
        CompanyLogo: {
          select: {
            url: true,
          },
        },
        user: {
          select: {
            name: true,
            lastName: true, 
          },
        },
        activityType: {
          select: {
            name: true,
            id: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

     // Safely parse openHours from Prisma's Json type
     return companies.map(company => ({
      ...company,
      openHours: company.openHours 
        ? (company.openHours as Prisma.JsonObject) // Explicit cast to Prisma.JsonObject
        : {}, // Fallback to an empty object if openHours is null or invalid
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
}
