'use server';

import prisma from '@/lib/prisma';


export const getCompanyByUser = async (userId: string) => {
    try {
      const company = await prisma.company.findFirst({
        where: {
          userId: userId,
        },
        include: {
          CompanyLogo: {
            select: {
              url: true,
            },
          },
          activityType: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      });
  
      if (!company) return null;
      return company; 
  
    } catch (error) {
      console.log(error);
      throw new Error('Error al obtener producto por usuario');
    }
  };