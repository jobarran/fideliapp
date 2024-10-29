'use server';

import prisma from '@/lib/prisma';


export const getProductsById = async (id: string) => {
    try {
      const product = await prisma.product.findUnique({
        where: {
            id: id,
        },
        include: {
            templates: true,
            ProductImage: true, 
        },
    });
  
      if (!product) return null;
  
      return product; // Return the company directly
  
    } catch (error) {
      console.log(error);
      throw new Error('Error al obtener producto por companyId');
    }
  };