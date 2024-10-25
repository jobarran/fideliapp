'use server';

import prisma from '@/lib/prisma';


export const getProductsByCompanyId = async (companyId: string) => {
    try {
      const products = await prisma.product.findMany({
        where: {
            companyId: companyId,
        },
        include: {
            templates: true,
            ProductImage: true, 
        },
    });
  
      if (!products) return null;
  
      return products; // Return the company directly
  
    } catch (error) {
      console.log(error);
      throw new Error('Error al obtener producto por companyId');
    }
  };