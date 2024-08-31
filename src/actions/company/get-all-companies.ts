'use server';

import prisma from '@/lib/prisma';

export const getAllCompanies = async () => {
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

    return companies;
  } catch (error) {
    console.log(error);
    return [];
  }
}
