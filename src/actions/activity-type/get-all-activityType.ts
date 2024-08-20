'use server';

import prisma from '@/lib/prisma';



export const getAllActivityType = async () => {

  try {
    const activityTypes = await prisma.activityType.findMany({
      orderBy: {
        name: 'asc'
      }
    });


    return activityTypes;



  } catch (error) {
    console.log(error);
    return [];
  }


}