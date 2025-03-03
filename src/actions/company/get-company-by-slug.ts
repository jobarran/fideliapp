'use server';

import prisma from '@/lib/prisma';


export const getCompanyBySlug = async (slug: string) => {
    try {
      const company = await prisma.company.findFirst({
        where: {
          slug: slug,
          validated: true
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
  
      return company; // Return the company directly
  
    } catch (error) {
      console.log(error);
      throw new Error('Error al obtener producto por slug');
    }
  };